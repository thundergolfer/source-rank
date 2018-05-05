# Facebook Hackathon 2018

----------

**Newcomers**, see [the intro doc](docs/project_intro.md) to get an idea of what this project is about.

----------

**STATUS:** 'Backbone' of *ReactJS* front-end and *Flask* + *PostGreSQL* backend is up on Heroku at app `facebook-hack-2018`.

**NEXT STEPS:**

1.  Invite collaborators to the Heroku app
2. Scope out the front-end work
3. Find a topic-modelling API

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

Install the front-end with [`yarn`](https://yarnpkg.com/lang/en/) by running `yarn`.

#### Backend

1. Back-end Python dependencies are managed by [`pipenv`](https://github.com/pypa/pipenv). Do `pipenv install --dev` to install everything.
2. [Install PostGreSQL](https://www.postgresql.org/download/) for local development.
3. You need to run `export DATABASE_URL=postgresql://localhost/$(whoami) && export FLASK_APP=./app.py` (for Windows use `set` not `export`)
4. Run `flask db init`

#### Messenger Bot

Install with [`yarn`](https://yarnpkg.com/lang/en/) by running `yarn`.

#### Deployment

To deploy the app, you'll need Heroku set up.

1. Get the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) if you don't already have it.
2. You will need to [get added as a collaborator](https://devcenter.heroku.com/articles/collaborating) to the app.

## Development

#### Running The app

##### Back-End

`python app.py`

##### Front-end

1. `cd frontend/`

2. `yarn run start`

#### Migrations

Database schema migrations are performed by editing the *FlaskSQLAlchemy* models in `backend/models.py` and then using *Flask-Migrate* to migrate with the command `flask db migrate`.

After running that command, check the created migration file in `migrations/`. If it looks good, run `flask db upgrade` to apply the migration and then commit the new migration file to the repo.
