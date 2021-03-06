# Source Rank - Facebook Hackathon 2018 - [![Build Status](https://travis-ci.com/thundergolfer/source-rank.svg?token=yHGWQ42iK2BPk1FjaUMc&branch=master)](https://travis-ci.com/thundergolfer/source-rank) [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/27e1e3bab7bc89016073)

---------

<p align="center">
  <img src="./docs/repo-image.svg" height="200" />
</p>


---------

**Newcomers**, see [the intro doc](docs/project_intro.md) to get an idea of what this project is about.

----------

## USEFUL STUFF

* **Google Drive Assets** - https://drive.google.com/open?id=1ZpnoNeRRa7MEpIqcvVNDGo1WPLLD7oBR

----------

## Overview

This project:

* has a [React JS](https://reactjs.org/) web app front-end,
* uses [Flask](http://flask.pocoo.org/) and [`flask_restful`](https://flask-restful.readthedocs.io/en/latest/) for the backend APIs,
* uses [PostGreSQL](https://www.postgresql.org/) for data persistence
* [Heroku](https://dashboard.heroku.com/) as the app cloud platform
* and various Python packages for the background workers

## Installation

#### Frontend

1. `cd frontend`
2. Install the front-end dependencies by running `npm install`.
3. Run the project with:
    - `npm start` - Runs a development server with hot reloading
    - `npm run build` - Creates a `/dist` folder containing a minified bundle (`bundle.js`) and `index.html`
    - `npm run serve` - Serves the `/dist` folder on an express server

#### Backend

1. Back-end Python dependencies are managed by [`pipenv`](https://github.com/pypa/pipenv). Do `pipenv install --dev` to install everything.
2. [Install PostGreSQL](https://www.postgresql.org/download/) for local development.
3. You need to run `export DATABASE_URL=postgresql://localhost/$(whoami) && export FLASK_APP=./app.py` (for Windows use `set` not `export`)
4. ~~Run `flask db init`~~ (probably don't want to do this)

#### Messenger Bot

1. `cd messenger-bot`
2. Install with [`yarn`](https://yarnpkg.com/lang/en/) by running `yarn`.

#### Chrome Extension

`coming soon`

## Deployment

#### Web Application

To deploy the web app, you'll need Heroku set up.

1. Get the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) if you don't already have it.
2. You will need to [get added as a collaborator](https://devcenter.heroku.com/articles/collaborating) to the app.

**The web application is deployed automatically on push to `master`**

#### Messenger Bot

1. `cd messenger-bot`
2. (FIRST TIME ONLY) `now switch source-rank`
3. `yarn run deploy`
4. Check `sourcerank-fb-messenger-bot.now.sh` (latest deployment)


#### Chrome Extension

`coming soon`

#### Review Apps

For our Heroku provided ['review apps'](https://devcenter.heroku.com/articles/github-integration-review-apps) the DB isn't automatically created. A command of this form can be manually run after the review app is create to copy over data

`heroku pg:copy facebook-hack-2018::DATABASE_URL DATABASE_URL --app facebook-hack-2018-pr-1384 --confirm facebook-hack-2018-pr-1384`

## Development

#### Running The app

##### Back-End

`python app.py`

##### Front-end

1. `cd frontend/`

2. `yarn run start`

##### Messenger bot

1. `yarn run start`

##### Chrome Extension

`coming soon`

#### Migrations

Database schema migrations are performed by editing the *FlaskSQLAlchemy* models in `backend/models.py` and then using *Flask-Migrate* to migrate with the command `flask db migrate`.

After running that command, check the created migration file in `migrations/`. If it looks good, run `flask db upgrade` to apply the migration and then commit the new migration file to the repo.
