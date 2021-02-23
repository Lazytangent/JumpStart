from flask import Blueprint, jsonify
from sqlalchemy import asc, desc
from app.models import Project, Donation

project_routes = Blueprint('projects', __name__)


@project_routes.route('/homepage/<string:optional_parameter>')
def get_homepage_projects(optional_parameter):
    projects = Project.query.all()
    if optional_parameter == 'popular':
        # filtered_projects =
        pass
    elif optional_parameter == 'recent':
        projects = Project.query.order_by(Project.id.desc()).limit(3).all()
        projects = [project.to_dict() for project in projects]
        return jsonify(projects)
    elif optional_parameter == 'trending':
        pass
    elif optional_parameter == 'location':
        pass


@project_routes.route('/discoverpage/<string:optional_parameter>')
def get_discoverpage_projects(optional_parameter):
    if optional_parameter == 'popular':
        pass
    elif optional_parameter == 'recent':
        pass
    elif optional_parameter == 'trending':
        pass
    elif optional_parameter == 'location':
        pass
    elif optional_parameter == 'searchedFor':
        pass
