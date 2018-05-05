from bs4 import BeautifulSoup
import requests
from flask_sqlalchemy import SQLAlchemy
from backend.models import AuthorClaim
from backend.models import Author


db = SQLAlchemy()


def get_politifact_scorecard_from_url(url):
    response = requests.get(url)
    if response.status_code is not 200:
        return None

    soup = BeautifulSoup(response.content, 'html.parser')
    if not soup:
        return None

    scorecard_div = soup.find('div', {'class': 'peepDetailRuling'})
    scores = []
    for count_span in scorecard_div.find_all('span', {'class': 'chartlist__count'}):
        scores.append(int(count_span.text.split(' ')[0]))

    #import pdb; pdb.set_trace()
    return scores


def get_politifact_scorecard_from_name(name):
    hyphenated_name = name.lower().replace(' ', '-')
    url = 'http://www.politifact.com/personalities/' + hyphenated_name + '/'
    return get_politifact_scorecard_from_url(url)


def insert_author_claim(author_id, truth):
    author_claim = AuthorClaim(author_id, truth)
    db.session.add(author_claim)
    db.session.commit()


def scrape_pundit_facts(author):
    # author = Author.query.filter_by(id=author_id).first()
    scores = get_politifact_scorecard_from_name(author.name)
    if scores is None:
        return

    num_truths = scores[0] + scores[1]
    num_lies = scores[3] + scores[4] + scores[5]

    author_claims = AuthorClaim.query.filter_by(id=author.id).all()
    for author_claim in author_claims:
        db.session.delete(author_claim)

    db.session.commit()

    for _ in range(num_truths):
        insert_author_claim(author.id, True)

    for _ in range(num_lies):
        insert_author_claim(author.id, False)


if __name__ == '__main__':
    # scores = get_politifact_scorecard_from_name('john', 'oliver')


    import pdb;pdb.set_trace()
    #get_politifact_scorecard_from_url('http://www.politifact.com/personalities/alex-jones/')