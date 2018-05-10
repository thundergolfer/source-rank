import logging
import sys
import scholarly

from backend.models import Author


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def find_areas_of_academic_study(author_name, db):
    # TODO: remove this commented out stuff. this method will do its thing
    # regardless of whether the model is created
    # --------------------------------------------------------------------
    # exists = db.session.query(
    #     db.session.query(Author).filter_by(name=author_name).exists()
    # ).scalar()
    # if exists:
    #     author = db.session.query(Author).filter_by(name=author_name)[0]
    #     return author.areas_of_interest
    logging.info("Looking up author '%s' on Google Scholar", author_name)
    search_results = scholarly.search_author(author_name)

    areas = []
    for author in search_results:
        # API is a fuzzy-match, we want exact match
        if author.name.lower() != author_name:
            continue

        areas.extend(author.interests)

    return areas


if __name__ == '__main__':
    # USAGE: python backend.analysis.scholarly 'Steven A. Cholewiak'
    find_areas_of_academic_study(sys.argv[1])
