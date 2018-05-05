from flask_marshmallow import Marshmallow

ma = Marshmallow()


class PublicationSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = (
            'id',
            'domain',
            'name',
            'subscription_revenue',
            'icon_url'
        )


pub_schema = PublicationSchema()
pubs_schema = PublicationSchema(many=True)
