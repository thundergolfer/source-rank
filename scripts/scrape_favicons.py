import logging
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import sqlalchemy

from backend.models import Publication
from app import app, db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def is_absolute(url):
    return bool(urlparse(url).netloc)


def main():
    app.app_context().push()

    for p in Publication.query.all():
        if p.domain.startswith('https//'):
            db.session.delete(p)
        if p.domain.startswith('http//'):
            db.session.delete(p)
        db.session.commit()

    for p in Publication.query.all():
        if p.icon_url:
            logging.info('Skipping {}'.format(p.domain))
            continue

        logging.info('Scraping for {}'.format(p.domain))
        try:
            page = requests.get(p.domain)
        except (requests.exceptions.SSLError, requests.exceptions.ConnectionError):
            continue

        if page.status_code != 200:
            logging.warning('Request to {} failed with {}'.format(p.domain, page.status_code))
            continue

        soup = BeautifulSoup(page.content, 'html.parser')

        interesting_rel_vals = [
            'Shortcut Icon',
            'shortcut icon',
            'SHORTCUT ICON',
            'icon'
        ]
        for rel_val in interesting_rel_vals:
            icon_link = soup.find("link", rel=rel_val)
            if icon_link:
                break

        if not icon_link:
            continue
            
        if is_absolute(icon_link['href']):
            p.icon_url = icon_link['href']
        else:
            p.icon_url = p.domain + icon_link['href']
        try:
            db.session.commit()
        except sqlalchemy.exc.DataError:
            continue


if __name__ == '__main__':
    main()
