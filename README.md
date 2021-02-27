# JumpStart

<p align="center">
<img src="/react-app/public/logo.png" />
</p>

## What is it?

JumpStart is a clone of Kickstarter with some GoFundMe influences.

## Developing

To start local development for this application, you'll need to:

1. `git clone` this repo
2. `cd` into the local repo
3. Run `pipenv install` in the root of the project
4. Create your own `.env` file in the root of the project based on the `.env.example` there
5. Create a user that matches the user you identified in your `.env` file in PostgreSQL
6. Create a database that matches the database you identified in your `.env` file in PostgreSQL
7. Go into the pipenv shell with `pipenv shell`
8. Run `flask db upgrade` to apply the migrations to your local database
9. Run `flask seed all` to seed your local database with our seeder content
10. Open another terminal and `cd` into the `react-app` directory and `npm install` there
11. Create your own `.env` file in the `react-app` directory based on the `.env.example` there
12. Start your Flask backend in the terminal that's in the root of the local project with `flask run`
13. Run `npm start` in your `react-app` directory to start the React app. This should open in your default browser.
14. Be sure to make your own branch for your changes before pushing up to GitHub.

## Technologies Used

* PostgreSQL
* Python
* Flask
* SQLAlchemy
* Alembic
* WTForms
* React
* JavaScript
* AWS S3
* Redux
* Heroku

## Live Site

[Here's](https://jump--start.herokuapp.com/) a link to the live app!

## Wiki

[Here's](https://github.com/Lazytangent/JumpStart/wiki) a link to our documentation!

## Features

Users can:

* Create Projects
* View Projects
* Update their Projects
* Delete their Projects
* Create Donations on others' Projects
* View Donations on all Projects
* Update their Donations
* Delete their Comment on their Donation

## Two Challenges

In our edit project form, we opted to make the user experience a little easier by letting users choose multiple images in two different ways. Since there might be images that were already uploaded for the project, we had to have two different ways of letting users delete uploaded images. While the backend was fairly straightforward, getting React to render what we wanted proved to be a little more difficult. In the end, we made use of the File API's FileList object and its similarities to
JavaScript's arrays to make the process easier.
