# Eventually this python module will drive the database enrichment for our 'info quality' metrics,
# but right now it'll just log out
import logging
from time import sleep

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

if __name__ == '__main__':
    while True:
        logger.info("I am running")
        sleep(10)
