import json
from werkzeug.security import generate_password_hash
from app.models import db, Project

# Adds a demo project, you can add other projects here if you want


def seed_projects():

    one = Project(
        userId=2,
        name="Danny Needs Rent Money",
        thumbnailImgUrl=
        "https://jumpstartjesse.s3.us-east-2.amazonaws.com/pexels-ketut-subiyanto-4246120.jpg",
        description=
        "I'm Danny and I can't afford to live here, I broke my leg and can't work anymore. My parents passed away last year, and I need some money to pay my rent till I can work again",
        goalAmount=10000,
        minPledge=5)

    two = Project(
        userId=3,
        name="Single Mom need diapers",
        thumbnailImgUrl=
        "https://jumpstartjesse.s3.us-east-2.amazonaws.com/pexels-pixabay-235554.jpg",
        description=
        "Anything helps! My husband passed away last year and I can't pay the bills till the insurance money comes in. Anything you can give would be really helpful.",
        goalAmount=1000,
        minPledge=5)
    three = Project(
        userId=1,
        name="Pursuing a Nascar career",
        thumbnailImgUrl=
        "https://jumpstartjesse.s3.us-east-2.amazonaws.com/pexels-garvin-st-villier-3311574+(1).jpg",
        description=
        "Need money for new car! I really want to try and become a Nascar driver, I would appreciate any help you can give",
        goalAmount=10000,
        minPledge=5)
    four = Project(
        userId=4,
        name="Kidney Failure need money to pay donor",
        thumbnailImgUrl=
        "https://jumpstartjesse.s3.us-east-2.amazonaws.com/pexels-anna-shvets-4483327.jpg",
        description=
        "My doctor said I only have one month to live if I do not get a transplant. Only 1 kidney left!",
        goalAmount=15000,
        minPledge=5)

    five = Project(
        userId=5,
        name="Basketball Lessons",
        thumbnailImgUrl=
        "https://jumpstartjesse.s3.us-east-2.amazonaws.com/pexels-cottonbro-6764351.jpg",
        description=
        "I am trying to pay for a basketball lesson from Lebron James for a kid in my neighbor hood. He was diagnosed with cancer last year and Lebron is his favorite player. Help him pursue his dreams!",
        goalAmount=20000,
        minPledge=5)

    new_projects = []
    with open('./app/seeds/projects.json') as f:
        data = json.load(f)
        for project in data:
            new_project = Project(**project)
            new_projects.append(new_project)


    db.session.add_all([one, two, three, four, five])
    db.session.add_all(new_projects)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the projects table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_projects():
    db.session.execute('TRUNCATE projects CASCADE;')
    db.session.commit()
