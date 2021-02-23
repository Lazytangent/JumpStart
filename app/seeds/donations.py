from werkzeug.security import generate_password_hash
from app.models import db, Donation

# Adds a demo user, you can add other users here if you want


def seed_donations():

    one = Donation(
                   userId=1,
                   projectId=1,
                   donationAmount=20,
                   comment="Happy to help!",
                   anonymous=False
                  )

    two = Donation(
                   userId=2,
                   projectId=2,
                   donationAmount=20,
                   comment="Hope this helps!",
                   anonymous=False
                  )

    three = Donation(
                     userId=3,
                     projectId=3,
                     donationAmount=20,
                     comment="I wanted to help!",
                     anonymous=False
                    )

    four = Donation(
                    userId=4,
                    projectId=4,
                    donationAmount=20,
                    comment="I think this will help!",
                    anonymous=False
                   )

    five = Donation(
                    userId=5, projectId=5, donationAmount=20,
                    comment="Fingers crossed that this helps!",
                    anonymous=False
                   )

    six = Donation(
                     userId=1,
                     projectId=3,
                     donationAmount=20,
                     comment="I wanted to help!",
                     anonymous=False
                    )

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.add(four)
    db.session.add(five)
    db.session.add(six)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_donations():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
