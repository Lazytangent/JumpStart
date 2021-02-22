from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(
                username='Demo',
                email='demo@aa.io',
                password='password',
                city='Dallas',
                state='Texas',
               )

    jesse = User(
                 username='jesse',
                 email='jesse@jumpstart.io',
                 password='password',
                 city='Milwaukee',
                 state='Wisconsin',
                )

    peter = User(
                 username='peter',
                 email='peter@jumpstart.io',
                 password='password',
                 city='Dallas',
                 state='Texas'
                )

    db.session.add(demo)
    db.session.add(jesse)
    db.session.add(peter)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
