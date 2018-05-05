import json
from flask import Response
from flask_restful import Resource, reqparse

from backend.evaluate.basic_as_fck import BasicArticleEvaluator
from backend.evaluate.article_evaluator import ArticleEvaluator
from backend.schemas import article_report_schema

from newspaper.urls import valid_url

parser = reqparse.RequestParser()
parser.add_argument('url')


class Article(Resource):
    def post(self):
        args = parser.parse_args()
        url = args['url']

        is_article_url = valid_url(url)
        if not is_article_url:
            response = Response(
                response=json.dumps(dict(error='url is not for an article')),
                status=400, mimetype='application/json'
            )
            return response

        try:
            report, heuristic_scores = ArticleEvaluator.evaluate(url)
        except ValueError:
            return Response(
                response=json.dumps(dict(error='article publisher not in dataset')),
                status=400, mimetype='application/json'
            )

        dict_report = article_report_schema.dump(report).data

        return {**dict_report, **heuristic_scores}
