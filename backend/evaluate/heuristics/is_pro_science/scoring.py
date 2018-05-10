from backend.evaluate.heuristics.core import HeuristicScore


def score_publication(publication):
    return HeuristicScore.max() if publication.pro_science else HeuristicScore(5)
