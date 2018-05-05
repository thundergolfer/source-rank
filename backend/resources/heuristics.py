import json
from flask import Response
from flask_restful import Resource, reqparse

from backend.evaluate.heuristics.core import ALL_HEURISTICS


class Heuristics(Resource):
    def get(self):
        heuristics = [
            {'name': x.motivator, 'description': x.description} for x in ALL_HEURISTICS
        ]

        return heuristics
