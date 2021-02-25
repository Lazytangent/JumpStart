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


@donation_routes.route('/donations/:donationId', methods=["PUT", "DELETE"])
def update_donation():
    if request.method == "PUT":
        pass
    elif request.method == "DELETE":
        pass
