from flask_restful import Resource, reqparse


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

        p = Pub(domain=args['domain'], name=args['name'])
        db.session.add(p)
        db.session.commit()

        return pub_schema.dump(p)
