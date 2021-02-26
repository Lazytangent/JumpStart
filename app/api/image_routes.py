from flask import Blueprint
from werkzeug.utils import secure_filename

from app.config import Config
from app.helpers import allowed_file, upload_file_to_s3, \
    validation_errors_to_error_messages
from app.models import Project, Image, db

image_routes = Blueprint('images', __name__)
