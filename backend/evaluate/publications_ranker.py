from backend.evaluate.heuristics.core import HeuristicID
from backend.evaluate.heuristics import trust_the_experts, has_subscription_model
from backend.models import Publication as Pub


def default_scorer(pub):
    return 1


class PubRanker():
    @classmethod
    def rank(cls, heuristic_id):
        publications = Pub.query.all()
        ranked = []
        h = HeuristicID(heuristic_id)
        if h == HeuristicID.TRUST_EXPERTS:
            score_func = trust_the_experts.score_publication
        elif h == HeuristicID.HAS_SUBSCRIPTION_MODEL:
            score_func = has_subscription_model.score_publication
        else:
            score_func = default_scorer

        # find scores
        for p in publications:
            ranked.append(
                {'id': p.id, 'score': score_func(p)}
            )

        # order based on score
        ranked.sort(key=lambda x: x['score'], reverse=True)

        for i, p in enumerate(ranked):
            if i is 0:
                p['rank'] = 1
                continue

            if p['score'] == ranked[i-1]['score']:
                p['rank'] = ranked[i-1]['rank']
            else:
                p['rank'] = ranked[i-1]['rank'] + 1

        return ranked
