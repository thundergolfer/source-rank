from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def get_or_create(session, model, **kwargs):
    instance = session.query(model).filter_by(**kwargs).first()
    if instance:
        return instance, False
    else:
        instance = model(**kwargs)
        session.add(instance)
        session.commit()
        return instance, True


# NOTE: This is an example model. We won't use it
class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<Company %r>' % self.username


class Publication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    domain = db.Column(db.String(120), unique=True, nullable=False)  # eg. https://www.nytimes.com/
    name = db.Column(db.String(80), nullable=True)  # eg. 'The New York Times'
    subscription_revenue = db.Column(db.Boolean, unique=False, default=False)
    icon_url = db.Column(db.String(256), unique=False, nullable=True)
    articles = db.relationship('Article', backref='publication', lazy=True)
    bias_level = db.Column(db.Integer, default=0)
    pro_science = db.Column(db.Boolean, unique=False, default=False)


article_authors = db.Table(
    'article_authors',
    db.Column(
        'article_id', db.Integer, db.ForeignKey('article.id'), primary_key=True
    ),
    db.Column(
        'author_id', db.Integer, db.ForeignKey('author.id'), primary_key=True
    )
)


class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(256), unique=True, nullable=False)
    publication_id = db.Column(db.Integer, db.ForeignKey('publication.id'), nullable=False)
    authors = db.relationship(
        'Author',
        secondary=article_authors,
        lazy='subquery',
        backref=db.backref('articles', lazy=True)
    )


class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # TODO: the uniqueness of a name is v. dubious
    name = db.Column(db.String(80), unique=True, nullable=False)
    areas_of_interest = db.Column(db.String(256), unique=False, nullable=True)


class AuthorClaim(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'), nullable=False)
    true = db.Column(db.Boolean, unique=False, default=True)
