import json
import logging
import sys
import newspaper
# from newspaper import Article

from backend.application import create_app
from backend.models import db, Article, Author, Publication, get_or_create
from backend.evaluate.heuristics.trust_the_experts.building.scholar import find_areas_of_academic_study
from backend.util import my_url_normalizer

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = create_app()
app.app_context().push()
db.init_app(app)


def process_publisher(publication, db):
    domain = publication.domain

    logger.info("Processing publication: %s", domain)
    publisher = newspaper.build(domain)
    articles = publisher.articles
    for a in articles:
        process_article(a, publication, db)


def process_article(article, publication, db):
    # check if article already exists in db
    logger.info("Processing article: {}".format(article.url))

    exists = db.session.query(
        db.session.query(Article).filter_by(url=article.url).exists()
    ).scalar()
    if exists:
        return

    article.download()
    article.parse()

    article_row = Article(url=article.url, publication_id=publication.id)

    for author_name in article.authors:
        author, created = get_or_create(db.session, Author, name=author_name)
        article_row.authors.append(author)
        if created:
            areas_of_academic_study = find_areas_of_academic_study(author_name, db)
            if len(str(areas_of_academic_study)) > 255:
                areas_of_academic_study = ['stuff'] # > 255 wont fit in DB
            author.areas_of_interest = json.dumps(areas_of_academic_study)
            db.session.commit()

    # enter article into db
    db.session.add(article_row)
    db.session.commit()


def process_all_publishers(db):
    for pub in Publication.query.all():
        process_publisher(pub, db)


if __name__ == '__main__':
    usage_msg = "USAGE: python -m backend.analysis.core [DOMAIN URL eg. https://cnn.com]"
    if len(sys.argv) > 2:
        exit(usage_msg)

    if len(sys.argv) is 2:
        domain = my_url_normalizer(sys.argv[1])
        pub = Publication.query.filter_by(domain=domain).first()
        if not pub:
            exit("No publication found for domain: {}".format(domain))

        process_publisher(pub, db)
    else:
        process_all_publishers(db)
