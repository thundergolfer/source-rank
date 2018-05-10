# Eventually this python module will drive the database enrichment for our 'info quality' metrics,
# but right now it'll just log out
import logging
from time import sleep

from backend.evaluate.heuristics.avoid_highly_biased.building.media_bias_fact_check_scraper import run_media_bias_scraping

ONE_HOUR = 60 * 60
HALF_HOUR = ONE_HOUR // 2

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

if __name__ == '__main__':
    while True:
        logger.info("I am running")
        run_media_bias_scraping()
        sleep(HALF_HOUR)
