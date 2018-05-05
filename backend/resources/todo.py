# NOTE: This modul was only here as boilerplate. It will eventually be removed
from flask_restful import Resource


class TodoList(Resource):
    def get(self):
        return [
            {'id': 2, 'text': 'nothgin'}
        ]


class Todo(Resource):
    def get(self, todo_id):
        return {
            'id': 1, 'text': 'text something'
        }
