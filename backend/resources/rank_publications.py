from flask import Response
from flask_restful import Resource, reqparse
from flask_restful import reqparse

import json
from urllib.parse import urlparse

from backend.evaluate.publications_ranker import PubRanker

parser = reqparse.RequestParser()
parser.add_argument('heuristic', type=int, location='args', required=True)
parser.add_argument('limit', type=int, location='args')

DEFAULT_PAYLOAD_LIMIT = 50


class PublicationsRank(Resource):
    def get(self):
        args = parser.parse_args()
        payload_limit = args.get('limit') or DEFAULT_PAYLOAD_LIMIT
        heuristic_id = args.get('heuristic')

        return {
            'publications': PubRanker.rank(heuristic_id),
            'rank_components': [heuristic_id]
        }
