from flask.cli import AppGroup
from .users import seed_users, undo_users
from .donations import seed_donations, undo_donations
from .images import seed_images, undo_images
from .projects import seed_projects, undo_projects

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_projects()
    seed_donations()
    seed_images()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_images()
    undo_donations()
    undo_projects()
    undo_users()
    # Add other undo functions here
