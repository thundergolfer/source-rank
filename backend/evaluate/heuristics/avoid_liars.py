from backend.evaluate.heuristics.core import HeuristicScore
from flask_sqlalchemy import SQLAlchemy
from backend.models import AuthorClaim


db = SQLAlchemy()


def score_author(author):
    num_truths = len(AuthorClaim.query.filter_by(id=author.id, true=True).all())
    num_lies = len(AuthorClaim.query.filter_by(id=author.id, true=False).all())

    score = HeuristicScore(5 + (num_truths - (2 * num_lies)) * 5)
    if score < HeuristicScore.min():
        score = HeuristicScore.min()
    elif score > HeuristicScore.max():
        score = HeuristicScore.max()

    return score


def score_article(article):
    total_authors = 0
    total_score = 0
    for author in article.authors:
        total_authors = total_authors + 1
        total_score = total_score + score_author(author)

    return total_score / total_authors


def score_publication(publication):
    total_authors = 0
    total_score = 0
    for article in publication:
        # This will count authors more than once if they have authored multiple articles
        for author in article:
            total_authors = total_authors + 1
            total_score = total_score + score_author(author)

    return total_score // total_authors