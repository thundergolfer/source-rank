import json
from backend.evaluate.heuristics.core import HeuristicScore


def score_publication(publication):
    total_authors = 0
    academic_authors = 0
    for article in publication.articles:
        for author in article.authors:
            total_authors += 1
            try:
                interest_areas = json.loads(author.areas_of_interest)
            except json.decoder.JSONDecodeError:
                continue

            if len(interest_areas) > 0:
                academic_authors += 1

    if total_authors <= 0:
        return HeuristicScore.min()
    percentage_academic = academic_authors / total_authors

    # very ugly, but implements a mapping from a percentage to a 0-10 scale
    if percentage_academic is 0:
        return HeuristicScore.min()
    elif percentage_academic < 0.01:
        return HeuristicScore(1)
    elif percentage_academic < 0.02:
        return HeuristicScore(3)
    elif percentage_academic < 0.05:
        return HeuristicScore(4)
    elif percentage_academic < 0.08:
        return HeuristicScore(6)
    elif percentage_academic < 0.1:
        return HeuristicScore(7)
    elif percentage_academic < 0.15:
        return HeuristicScore(8)
    elif percentage_academic < 0.20:
        return HeuristicScore(9)
    elif percentage_academic >= 0.2:
        return HeuristicScore.max()
