import json
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
    seven = Donation(
                    userId=1,
                    projectId=9,
                    donationAmount=90,
                    comment="I wanted to help!",
                    anonymous=False
                   )
    eight = Donation(
                    userId=1,
                    projectId=8,
                    donationAmount=100,
                    comment="",
                    anonymous=True
                    )
    nine = Donation(
                    userId=1,
                    projectId=7,
                    donationAmount=200,
                    comment="Happy to help!",
                    anonymous=False
                    )
    ten = Donation(
                    userId=1,
                    projectId=6,
                    donationAmount=2000,
                    comment="",
                    anonymous=True
                    )
    eleven = Donation(
                    userId=1,
                    projectId=10,
                    donationAmount=150,
                    comment="",
                    anonymous=True
                    )

    new_donations = []
    with open('./app/seeds/donations.json') as f:
        data = json.load(f)
        for donation in data:
            new_donation = Donation(**donation)
            new_donations.append(new_donation)


    db.session.add_all([one, two, three, four, five, six, seven, eight, nine, ten, eleven])
    db.session.add_all(new_donations)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_donations():
    db.session.execute('TRUNCATE donations CASCADE;')
    db.session.commit()
