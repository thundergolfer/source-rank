from flask import Response
from flask_restful import Resource, reqparse
import json
from urllib.parse import urlparse

from backend.models import Publication as Pub
from backend.models import db
from backend.schemas import pub_schema, pubs_schema


parser = reqparse.RequestParser()
parser.add_argument('domain')
parser.add_argument('name')


class Publications(Resource):
    def get(self):
        publications = Pub.query.all()

        return pubs_schema.dump(publications)

    def post(self):
        """
        Add a new publication to the database
        """
        args = parser.parse_args()
        url = urlparse(args['domain'])

        if url.scheme not in ('http', 'https') or not url.netloc:
            response = Response(
                response=json.dumps(dict(error='bad url')),
                status=400, mimetype='application/json'
            )
            return response

        scheme = url.scheme
        netloc = url.netloc
        if not netloc.startswith('www.'):
            netloc = 'www.' + netloc
        normalized_url = '{}//{}'.format(scheme, netloc)

        p = Pub.query.filter_by(domain=normalized_url).first()
        if p:
            return pub_schema.dump(p)

        p = Pub(domain=normalized_url, name=args['name'])
        db.session.add(p)
        db.session.commit()

        return pub_schema.dump(p)
