import json
from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(
                username='Demo',
                email='demo@aa.io',
                password='password',
                city='Nashville',
                state='Tennessee',
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

    reed = User(
                username='reed',
                email='reed@jumpstart.com',
                password='password',
                city='Austin',
                state='Texas'
                )

    dillon = User(
                  username='dillon',
                  email='dillon@jumpstart.com',
                  password='password',
                  city='Buena Vista',
                  state='Colorado'
                )

    new_users = []
    with open('./app/seeds/users.json') as f:
        data = json.load(f)
        for user in data:
            new_user = User(**user)
            new_users.append(new_user)


    db.session.add_all([demo, jesse, peter, reed, dillon])
    db.session.add_all(new_users)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()
