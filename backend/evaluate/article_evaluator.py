from math import floor

from backend.util import my_url_normalizer
from backend.models import Publication
from backend.models import ArticleReport
from backend.evaluate.heuristics.core import HeuristicScore

from backend.evaluate.heuristics.is_pro_science import score_publication as is_pro_science_scorer
from backend.evaluate.heuristics.trust_the_experts import score_publication as trust_the_experts_scorer
from backend.evaluate.heuristics.has_subscription_model import score_publication as has_subscription_model_scorer

MAP_SCORE_TO_STR_RATING = {
    0: 'Block whoever wrote this',
    1: 'Pure shit',
    2: 'Straight up trash',
    3: 'Pretty dubious',
    4: 'Don\'t bother',
    5: 'We\'d be skeptical',
    6: 'Alright',
    7: 'You can trust it',
    8: 'Rock-solid',
    9: 'Excellent',
    10: 'Perfect',
}


class ArticleEvaluator():
    @classmethod
    def evaluate(cls, url):
        publication = cls._get_associated_publication(url)

        if publication is None:
            raise ValueError('Article publisher not in database')

        evaluation = {}
        evaluation['trust-the-experts'] = trust_the_experts_scorer(publication)
        evaluation['is-pro-science'] = is_pro_science_scorer(publication)
        evaluation['has-subscription-revenue'] = has_subscription_model_scorer(publication)

        score = 0
        num_heuristics_evaluated = 0
        for key in evaluation:
            score += evaluation[key]
            num_heuristics_evaluated += 1

        score = floor(score / (num_heuristics_evaluated * HeuristicScore.max()) * 10)

        article_report = ArticleReport(
            url=url,
            str_rating=MAP_SCORE_TO_STR_RATING[score],
            num_rating=score
        )
        heuristic_scores = {'heuristics': evaluation}

        return article_report, heuristic_scores

    @classmethod
    def _get_associated_publication(cls, url):
        domain = my_url_normalizer(url)
        return Publication.query.filter_by(domain=domain).first()
