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
    first_result = None
    for author in search_results:
        if first_result is None:
            first_result = author

        areas.extend(author.interests)

    # TODO: Add first_result into DB

    return areas


if __name__ == '__main__':
    # USAGE: python backend.analysis.scholarly 'Steven A. Cholewiak'
    find_areas_of_academic_study(sys.argv[1])
