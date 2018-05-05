from enum import IntEnum


class HeuristicID(IntEnum):
    TRUST_EXPERTS = 1
    HAS_SUBSCRIPTION_MODEL = 2
    PRO_SCIENCE = 3
    BIAS = 4
    VALUE_SOURCES = 5


class Heuristic():
    def __init__(self, id, key, motivator, description):
        self.id = id
        self.key = key
        self.motivator = motivator
        self.description = description


ALL_HEURISTICS = [
    Heuristic(
        HeuristicID.TRUST_EXPERTS,
        'trust-the-experts',
        'I trust in experts',
        'In order to gain the best information on topics such as economics, politics, philosophy, biology etc turn to the experts on those fields, who dedicate themselves to specialising in complex problem domains. So in order honor this information-quality heuristic, we evaluate publication on the basis of how many academics contribute to the publication. Use this heuristic is you care that a publishers has experts contributing to their publication, and not amateurs.'
    ),
    Heuristic(
        HeuristicID.PRO_SCIENCE,
        'is-pro-science',
        'I want science backed information',
        'Science is perhaps the greatest knowledge seeking tool of mankind. Often where scientific knowledge exists it is ignored or misused by content publishers. Use this heuristic if you are most interested in sources that put a strong emphasis on respect of scientific expertise and the scientific method.'
    ),
    Heuristic(
        HeuristicID.HAS_SUBSCRIPTION_MODEL,
        'has-subscription-revenue',
        'I don\'t want click-funded content',
        'This heuristic asks if a publication has a subscription revenue model. Purely click-funded publications have mis-aligned incentives with users. They are motivated to sensationalise, mislead and fabricate in order to drive \'clicks\'. Publications that have a subscription model are not as incentivised to drive clicks, and instead seek to gain the respect and loyalty of their paying subscribers.'
    ),
    Heuristic(
        HeuristicID.BIAS,
        'bias',
        'I want to avoid highly biased sources',
        'Whether left or right, political bias has a tendency distort information reporting away from factual and towards ideological. Do note however, that high bias is not necessarily an negative. To assume so is to commit the [*Argument to Moderation*](https://en.wikipedia.org/wiki/Argument_to_moderation) fallacy'
    ),
    Heuristic(
        HeuristicID.VALUE_SOURCES,
        'i-value-sources',
        'I value sources',
        'Good information is typically *dense* information. A lack of links to external websites is a signal of shallow and/or facile analyis.'
    ),
]

HEURISTICS_DICT = {x.key: x for x in ALL_HEURISTICS}


class HeuristicScore(int):
    MIN = 0
    MAX = 10

    def __init__(self, val):
        if not self._valid_val(val):
            raise ValueError("Cannot have a score of value: {}".format(val))
        else:
            self.val = val

    @classmethod
    def max(cls):
        return HeuristicScore(cls.MAX)

    @classmethod
    def min(cls):
        return HeuristicScore(cls.MIN)

    def _valid_val(self, val):
        if val < self.MIN or val > self.MAX:
            return False
        return True
