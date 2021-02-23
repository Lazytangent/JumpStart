from flask import Blueprint, jsonify
from sqlalchemy import asc, desc, func
from app.models import Project, Donation, User

project_routes = Blueprint('projects', __name__)


@project_routes.route('/homepage/<string:optional_parameter>')
def get_homepage_projects(optional_parameter):
    if optional_parameter == 'popular':
        projects = \
            Project.query.join(Donation). \
            group_by(Project.id). \
            order_by(desc(func.count(Donation.projectId))).all()
        print(projects)
        projects = [project.to_dict() for project in projects]
        return jsonify(projects)
    elif optional_parameter == 'recent':
        projects = Project.query.order_by(Project.id.desc()).limit(3).all()
        projects = [project.to_dict() for project in projects]
        return jsonify(projects)
    elif optional_parameter == 'trending':
        pass
    elif optional_parameter == 'location':
        pass


@project_routes.route('/homepage/<int:userId>')
def get_homepage_projects_by_location(userId):
    user = User.query.filter(User.id == userId)
    state = user.state
    projects = Project.query.filter(Project.state == state).limit(3).all()
    return jsonify(projects)


@project_routes.route('/discoverpage/<string:optional_parameter>')
def get_discoverpage_projects(optional_parameter):
    if optional_parameter == 'popular':
        pass
    elif optional_parameter == 'recent':
        projects = Project.query.order_by(Project.id.desc()).all()
        projects = [project.to_dict() for project in projects]
        return jsonify(projects)
    elif optional_parameter == 'trending':
        pass
    elif optional_parameter == 'location':
        pass
    elif optional_parameter == 'searchedFor':
        pass
