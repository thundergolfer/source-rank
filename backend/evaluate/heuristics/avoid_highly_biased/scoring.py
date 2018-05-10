from backend.evaluate.heuristics.core import HeuristicScore


def score_publication(publication):
    if publication.bias_level == 0:
        return HeuristicScore.max()
    elif publication.bias_level == 1:
        return HeuristicScore(5)
    elif publication.bias_level == 2:
        return HeuristicScore.min()
    else:
        # Not penalizing if no bias level provided
        return HeuristicScore.max()
