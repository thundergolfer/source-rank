from urllib.parse import urlparse

from backend.models import ArticleReport


def basic_good_report(url):
    return ArticleReport(
        url=url,
        str_rating="Worth a look",
        num_rating=7
    )


def basic_very_good_report(url):
    return ArticleReport(
        url=url,
        str_rating="'A' grade",
        num_rating=9
    )


def basic_bad_report(url):
    return ArticleReport(
        url=url,
        str_rating="Don't bother",
        num_rating=4
    )


def basic_very_bad_report(url):
    return ArticleReport(
        url=url,
        str_rating="Straight up trash",
        num_rating=1
    )


class BasicArticleEvaluator():
    good_sites = set(['www.theguardian.com'])
    bad_sites = set(['www.breitbart.com'])

    @classmethod
    def evaluate(cls, url):
        parsed_url = urlparse(url)

        if parsed_url.netloc in cls.good_sites:
            return basic_very_good_report(url)
        elif parsed_url.netloc in cls.bad_sites:
            return basic_very_bad_report(url)

        return basic_good_report(url)
