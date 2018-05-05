from flask_migrate import Migrate

from backend.schemas import ma
from backend.models import db
from backend.application import create_app

import os

app = create_app(ma, db)
migrate = Migrate(app, db)


@app.route('/', defaults={'path': ''})
@app.route('/about')
@app.route('/privacy')
@app.route('/terms')
@app.route('/article')
@app.route('/methodology')
@app.route('/demo')
def homepage():
    return app.send_static_file('index.html')


@app.route('/static/<path:path>')
def static_resource(path):
    return app.send_static_file('/' + path)
#
#
# @app.route('/<path:path>')
# def wildcard(path):
#     return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, host='0.0.0.0')
