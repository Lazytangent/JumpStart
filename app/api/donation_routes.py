from flask import Blueprint, request

from app.forms import CreateDonation
from app.models import db, Donation, Project, User
from app.helpers import validation_errors_to_error_messages

donation_routes = Blueprint('donations', __name__)


@donation_routes.route('/', methods=["POST"])
def create_donation():
    form = CreateDonation()
    form['csrf_token'] = request.cookies['csrf_token']
    if form.validate_on_submit():
        donation = Donation()
        form.populate_obj(donation)
        db.session.add(donation)
        db.session.commit()
        return donation.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@donation_routes.route('/donations/<int:donationId>',
                       methods=["PUT", "DELETE"])
def update_donation(donationId):
    donation = Donation.query.get(donationId)
    if request.method == "PUT":
        form = CreateDonation()
        if form.validate_on_submit():
            form.populate_obj(donation)
            db.session.commit()
            return donation.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}
    elif request.method == "DELETE":
        db.session.delete(donation)
        db.session.commit()
        return {'message': 'Delete was successful'}
    return {'message': 'Invalid route'}
