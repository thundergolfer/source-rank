import json
from flask import Response
from flask_restful import Resource, reqparse

class Heuristics(Resource):
    def get(self):
        heuristics = [
            {
                'name': 'I trust the experts',
                'description': 'How many academics contribute to the publication?'
            },
            {
                'name': 'I value sources',
                'description': 'How many links out of an average article on the publication?'
            },
            {
                'name': 'I don\'t want click-funded content',
                'description': 'Do they have a subscription revenue model?'
            },
            {
                'name': 'I want to avoid dishonest publications',
                'description': 'How many time have their articles been review as \"false\" on Snopes.com'
            },
            {
                'name': 'I want to avoid highly biased sources',
                'description': 'Use https://mediabiasfactcheck.com/'
            }
        ]

        return heuristics