# Usage: python -m backend.scraping.media_bias_fact_check

import logging
import requests
import os
import psycopg2
from bs4 import BeautifulSoup

from backend.util import my_url_normalizer, componentise_database_url

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def get_publication_source_url(mediabiasfactcheck_page_url):
    response = requests.get(mediabiasfactcheck_page_url)
    soup = BeautifulSoup(response.content, 'html.parser')
    if not soup:
        return None

    entry_content = soup.find('div', {'class': 'entry-content'})
    if entry_content:
        for p_tag in entry_content.find_all('p'):
            if 'source:' in p_tag.text.lower():
                source_link = p_tag.find('a').get('href')
                return source_link

    return None


def get_media_bias_list_from_page(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    entry = soup.findAll('div', {'class': 'entry clearfix'})[0]
    list = entry.find_all('p')[1]
    return list


def scrape_biased_publications():
    left_bias_url = 'https://mediabiasfactcheck.com/left/'
    right_bias_url = 'https://mediabiasfactcheck.com/right/'
    biased_publications = []

    for url in [left_bias_url, right_bias_url]:
        list = get_media_bias_list_from_page(url)
        for item in list.find_all('a'):
            item_page = item.get('href')
            item_name = item.text
            source_url = get_publication_source_url(item_page)
            if item_name and source_url:
                logger.info('Scraped: {}'.format(source_url))
                biased_publications.append(
                    {'name': item_name, 'url': source_url}
                )
                normalized = my_url_normalizer(source_url)
                update_publication_bias_level(normalized, item_name.rstrip(), 2)
                logger.info('Added to DB: {}'.format(normalized))

    return biased_publications


def get_pro_science_publications():
    url = 'https://mediabiasfactcheck.com/pro-science/'
    publications = []

    list = get_media_bias_list_from_page(url)
    for item in list.find_all('a'):
        item_page = item.get('href')
        item_name = item.text
        source_url = get_publication_source_url(item_page)
        if item_name and source_url:
            logger.info('Scraped: {}'.format(source_url))
            publications.append(
                {'name': item_name, 'url': source_url}
            )
            normalized = my_url_normalizer(source_url)
            update_publication_pro_science(normalized, item_name.rstrip(), True)

    return publications


def upsert_attribute_query(pub_domain, pub_name, attr_name, attr_val):
    sql = """INSERT INTO publication (domain, name, {})
    VALUES (
      '{}',
      '{}',
      {}
    )
    ON CONFLICT (domain)
    DO
      UPDATE
        SET {} = {};
    """.format(
        attr_name,
        pub_domain,
        pub_name,
        attr_val,
        attr_name,
        attr_val
    )
    return sql


def update_publication_pro_science(pub_domain, pub_name, pro_science):
    sql = upsert_attribute_query(pub_domain, pub_name, 'pro_science', pro_science)
    conn = None
    vendor_id = None

    try:
        # read database configuration
        # connect to the PostgreSQL database
        if 'USER' in os.environ:
            connect_str = "dbname='{}' user='{}' host='localhost' ".format(
                os.environ['USER'],
                os.environ['USER']
            )
            conn = psycopg2.connect(connect_str)
        else:
            conn = psycopg2.connect(
                **componentise_database_url()
            )
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql)
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return vendor_id


def update_publication_bias_level(pub_domain, pub_name, bias_level):
    sql = upsert_attribute_query(pub_domain, pub_name, 'bias_level', bias_level)
    conn = None
    vendor_id = None

    try:
        # read database configuration
        # connect to the PostgreSQL database
        if 'USER' in os.environ:
            connect_str = "dbname='{}' user='{}' host='localhost' ".format(
                os.environ['USER'],
                os.environ['USER']
            )
            conn = psycopg2.connect(connect_str)
        else:
            conn = psycopg2.connect(
                **componentise_database_url()
            )
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql)
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return vendor_id


def run_media_bias_scraping():
    get_pro_science_publications()
    scrape_biased_publications()


if __name__ == '__main__':
    run_media_bias_scraping()
