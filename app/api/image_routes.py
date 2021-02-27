from flask import Blueprint

from app.config import Config
from app.helpers import allowed_file, upload_file_to_s3, \
    validation_errors_to_error_messages
from app.models import Project, Image, db

image_routes = Blueprint('images', __name__)


@image_routes.route('/<int:image_id>', methods=["DELETE"])
def delete_image(image_id):
    image = Image.query.get(image_id)
    project = Project.query.get(image.projectId)
    db.session.delete(image)
    db.session.commit()
    return project.to_dict()
