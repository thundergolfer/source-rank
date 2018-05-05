from flask import Flask
from flask_restful import Api

from backend.resources.todo import TodoList
from backend.resources.publications import Publications
from backend.resources.rank_publications import PublicationsRank
from backend.resources.article import Article
from backend.resources.heuristics import Heuristics
from backend.schemas import ma
from backend.models import db
from backend.settings import config


static_folder = '../frontend/dist'


def initialise_app(app, marshmallow, sql_alchemy_db):
    ma.init_app(app)  # `marshmallow` ORM library init

    with app.app_context():
        db.init_app(app)  # SQLAlchemy DB layer init


def create_app(marshmallow=None, sql_alchemy_db=None):
    app = Flask(__name__, static_url_path='', static_folder=static_folder)
    app.config['SQLALCHEMY_DATABASE_URI'] = config.DB_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    if marshmallow and sql_alchemy_db:
        initialise_app(app, marshmallow, sql_alchemy_db)

    attach_api(app)

    return app


def attach_api(app):
    api = Api(app)

    api.add_resource(TodoList, '/api/todos')
    api.add_resource(Publications, '/api/publications')
    api.add_resource(Article, '/api/article')
    api.add_resource(PublicationsRank, '/api/publications/rank')
    api.add_resource(Heuristics, '/api/methodology/heuristics')
