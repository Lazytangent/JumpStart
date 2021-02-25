from flask import Blueprint

from app.forms import CreateDonation
from app.models import db, Donation, Project, User

donation_routes = Blueprint('donations', __name__)


@donation_routes.route('/', methods=["POST"])
def create_donation():
    pass
