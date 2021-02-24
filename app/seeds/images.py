from werkzeug.security import generate_password_hash
from app.models import db, Image

# Adds a demo user, you can add other users here if you want


def seed_images():

    one = Image(
                projectId=1,
                imageUrl="https://wiweddingvenues.com/wp-content/uploads/2020/11/DSC_3140.jpg"
               )

    db.session.add(one)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_images():
    db.session.execute('TRUNCATE images CASCADE;')
    db.session.commit()
