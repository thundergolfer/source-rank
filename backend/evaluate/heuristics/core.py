from enum import Enum


class HeuristicID(Enum):
    TRUST_EXPERTS = 1
    HAS_SUBSCRIPTION_MODEL = 2


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
