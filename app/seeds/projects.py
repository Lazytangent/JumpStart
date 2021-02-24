from werkzeug.security import generate_password_hash
from app.models import db, Project

# Adds a demo project, you can add other projects here if you want


def seed_projects():

    one = Project(userId=2, name="Danny Needs Rent Money",
                  thumbnailImgUrl="https://i.imgur.com/xg4C3F2.jpg",
                  description="I'm Danny and I can't afford to live here, I broke my leg and can't work anymore. My parents passed away last year, and I need some money to pay my rent till I can work again",
                  goalAmount=10000,
                  minPledge=5)

    two = Project(userId=3, name="Single Mom need diapers",
                  thumbnailImgUrl="https://i.imgur.com/xg4C3F2.jpg",
                  description="Anything helps! My husband passed away last year and I can't pay the bills till the insurance money comes in. Anything you can give would be really helpful.",
                  goalAmount=1000,
                  minPledge=5)
    three = Project(userId=1, name="Pursuing a Nascar career",
                    thumbnailImgUrl="https://i.imgur.com/xg4C3F2.jpg",
                    description="Need money for new car!",
                    goalAmount=10000,
                    minPledge=5)
    four = Project(userId=3, name="Kidney Failure need money to pay donor",
                   thumbnailImgUrl="https://i.imgur.com/xg4C3F2.jpg",
                   description="Only 1 kidney left!",
                   goalAmount=15000,
                   minPledge=5)

    five = Project(userId=3, name="Basketball Lessons",
                   thumbnailImgUrl="https://i.imgur.com/xg4C3F2.jpg",
                   description="Help me my pursue my dreams!",
                   goalAmount=20000,
                   minPledge=5)

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.add(four)
    db.session.add(five)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the projects table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_projects():
    db.session.execute('TRUNCATE projects;')
    db.session.commit()
