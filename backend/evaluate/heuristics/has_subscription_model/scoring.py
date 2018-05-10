from backend.evaluate.heuristics.core import HeuristicScore


def score_publication(publication):
    return HeuristicScore.max() if publication.subscription_revenue else HeuristicScore.min()
