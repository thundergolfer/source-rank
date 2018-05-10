#!/usr/bin/python
import psycopg2


def update_publication(pub_domain, pub_name, has_subscription_model):
    sql = """INSERT INTO publication (domain, name, subscription_revenue)
    VALUES (
      '{}',
      '{}',
      {}
    )
    ON CONFLICT (domain)
    DO
      UPDATE
        SET subscription_revenue = {};
    """.format(pub_domain, pub_name, has_subscription_model, has_subscription_model)
    conn = None
    vendor_id = None

    try:
        # read database configuration
        # connect to the PostgreSQL database
        connect_str = "dbname='jonathonbelotti' user='jonathonbelotti' host='localhost' "
        conn = psycopg2.connect(connect_str)
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(sql)
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return vendor_id


if __name__ == '__main__':
    data = [
        ('https://www.nytimes.com', 'The New York Times', True),
        ('https://www.buzzfeed.com', 'Buzzfeed', False),
        ('https://www.theguardian.com', 'The Guardian', True),
        ('https://www.theage.com.au', 'The Age', True),
        ('https://www.spectator.co.uk', 'The Spectator UK', True),
        ('https://www.wsj.com', 'The Wall Street Journal', True),
        ('https://www.usatoday.com', 'USA Today', True),
        ('http://www.latimes.com', 'Los Angeles Times', True),
        ('https://www.mercurynews.com', 'The Mercury News', True),
        ('http://www.nydailynews.com', 'New York Daily News', True),
        ('https://nypost.com/', 'New York Post', False),
        ('https://www.washingtonpost.com/', 'The Washington Post', True),
        ('https://chicago.suntimes.com/', 'The Chicago Sun Times', True),
        ('https://www.denverpost.com/', 'The Denver Post', True),
        ('http://www.chicagotribune.com/', 'The Chicago Tribune', True),
        ('https://www.dallasnews.com/', 'The Dallas Morning News', True),
        ('https://www.newsday.com/', 'Newsday', True),
        ('https://www.chron.com/', 'Houston Chronicle', True),
        ('https://www.washingtonpost.com/', 'The Washington Post', True),
        ('http://www.startribune.com/', 'Star Tribune', True),
        ('https://www.theaustralian.com.au', 'The Australian', True),
        ('http://www.heraldsun.com.au/', 'The Herald Sun', True),
        ('https://www.vox.com/', 'Vox Media', False),
        ('https://jacobinmag.com/', 'Jacobin', True),
        ('http://www.breitbart.com/', 'Breitbart', True),
        ('https://www.amren.com/', 'American Renaissance', False),
        ('https://dailystormer.name', 'The Daily Stormer', False),
        ('https://www.bostonglobe.com/', 'The Boston Globe', True),
        ('https://www.thetimes.co.uk/', 'The Times', True),
        ('https://www.jezebel.com/', 'Jezebel', False),
        ('https://www.theonion.com/', 'The Onion', False),
        ('https://www.huffingtonpost.com', 'Huffinton Post', False),
        ('http://www.foxnews.com/', 'Fox News', False),
        ('http://www.dailymail.co.uk', 'The Daily Mail', False),
        ('http://www.chinadaily.com.cn/', 'China Daily', False),
        ('http://www.lemonde.fr', 'Le Monde', True),
        ('https://www.afr.com.au', 'The Australian Financial Review', True),
        ('https://www.newyorker.com/', 'The New Yorker', True),
        ('https://www.theatlantic.com', 'The Atlantic', True),
        ('https://www.forbes.com', 'Forbes', True)
    ]

    for d in data:
        update_publication(*d)
