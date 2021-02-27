from flask import Blueprint, jsonify, request
from sqlalchemy import desc, func
from werkzeug.utils import secure_filename

from app.config import Config
from app.forms import CreateProject
from app.helpers import allowed_file, upload_file_to_s3, \
    validation_errors_to_error_messages
from app.models import Project, Donation, User, Image, db

project_routes = Blueprint('projects', __name__)


@project_routes.route('/all')
def get_all_projects_for_search_bar():
    project = Project.query.all()
    project = [project.to_dict() for project in project]
    return jsonify(project)


@project_routes.route('/<int:projectId>')
def get_project_by_id(projectId):
    project = Project.query.filter(Project.id == projectId).one()
    return jsonify(project.to_dict())


@project_routes.route('/homepage/<string:optional_parameter>')
def get_homepage_projects(optional_parameter):
    projects = []

    if optional_parameter == 'popular':
        projects = \
            Project.query.join(Donation). \
            group_by(Project.id). \
            order_by(desc(func.count(Donation.projectId))).limit(3).all()
        projects = [project.to_dict() for project in projects]

    elif optional_parameter == 'recent':
        projects = Project.query.order_by(Project.id.desc()).limit(3).all()
        projects = [project.to_dict() for project in projects]

    elif optional_parameter == 'trending':
        projects = \
            Project.query.join(Donation). \
            group_by(Project.id). \
            order_by(desc(func.count(Donation.projectId)),
                     desc(Project.id)).limit(3).all()
        projects = [project.to_dict() for project in projects]

    return jsonify(projects)


@project_routes.route('/homepage/<int:userId>')
def get_homepage_projects_by_location(userId):
    user = User.query.filter(User.id == userId).one()
    state = user.state
    all_projects = Project.query.join(User).filter(
        User.state == state).limit(3).all()
    projects = [project.to_dict() for project in all_projects]
    return jsonify(projects)


@project_routes.route('/discoverpage/<string:optional_parameter>')
def get_discoverpage_projects(optional_parameter):
    projects = []

    if optional_parameter == 'popular':
        projects = \
            Project.query.join(Donation). \
            group_by(Project.id). \
            order_by(desc(func.count(Donation.projectId))).all()
        projects = [project.to_dict() for project in projects]

    elif optional_parameter == 'recent':
        projects = Project.query.order_by(Project.id.desc()).all()
        projects = [project.to_dict() for project in projects]

    elif optional_parameter == 'trending':
        projects = \
            Project.query.join(Donation). \
            group_by(Project.id). \
            order_by(desc(func.count(Donation.projectId)),
                     desc(Project.id)).all()
        projects = [project.to_dict() for project in projects]

    return jsonify(projects)


@project_routes.route('/discoverpage/<int:userId>')
def get_discoverpage_projects_by_location(userId):
    user = User.query.filter(User.id == userId).one()
    state = user.state
    all_projects = Project.query.join(User). \
        filter(User.state == state).all()
    projects = [project.to_dict() for project in all_projects]
    return jsonify(projects)


@project_routes.route('/', methods=["POST"])
def create_new_project():
    form = CreateProject()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        thumbnailImgUrl = "/logo.png"

        if 'thumbnailImg' in request.files:
            image = request.files['thumbnailImg']

            if allowed_file(image.filename):
                image.filename = secure_filename(image.filename)
                thumbnailImgUrl = upload_file_to_s3(image, Config.S3_BUCKET)

        project = Project()
        form.populate_obj(project)
        project.thumbnailImgUrl = thumbnailImgUrl
        db.session.add(project)
        db.session.commit()

        if 'images' in request.files:
            images = request.files.getlist('images')

            for image in images:
                if allowed_file(image.filename):
                    image.filename = secure_filename(image.filename)
                    image_url = upload_file_to_s3(image, Config.S3_BUCKET)
                    image = Image(projectId=project.id, imageUrl=image_url)
                    db.session.add(image)
        db.session.commit()
        return project.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}


@project_routes.route('/<int:project_id>', methods=["PUT", "DELETE"])
def update_project(project_id):
    project = Project.query.get(project_id)

    if request.method == "PUT":
        form = CreateProject()
        form['userId'].data = project.userId
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            thumbnailImgUrl = project.thumbnailImgUrl

            if 'thumbnailImg' in request.files:
                image = request.files['thumbnailImg']

                if allowed_file(image.filename):
                    image.filename = secure_filename(image.filename)
                    thumbnailImgUrl = upload_file_to_s3(
                        image, Config.S3_BUCKET)
            form.populate_obj(project)
            project.thumbnailImgUrl = thumbnailImgUrl
            db.session.commit()

            if 'images' in request.files:
                images = request.files.getlist('images')
                for image in images:
                    if allowed_file(image.filename):
                        image.filename = secure_filename(image.filename)
                        image_url = upload_file_to_s3(image, Config.S3_BUCKET)
                        image = Image(projectId=project.id, imageUrl=image_url)
                        db.session.add(image)
            db.session.commit()
            return project.to_dict()

        return {'errors': validation_errors_to_error_messages(form.errors)}

    elif request.method == "DELETE":
        db.session.delete(project)
        db.session.commit()
        return {'message': 'Delete Successful'}

    return {'message': 'Invalid Route'}
