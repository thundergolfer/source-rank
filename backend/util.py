import os
from urllib.parse import urlparse


def my_url_normalizer(url):
    url = urlparse(url)
    if url.scheme not in ('http', 'https') or not url.netloc:
        response = Response(
            response=json.dumps(dict(error='bad url')),
            status=400, mimetype='application/json'
        )
        return response

    scheme = url.scheme
    netloc = url.netloc
    if not netloc.startswith('www.'):
        netloc = 'www.' + netloc
    normalized_url = '{}//{}'.format(scheme, netloc)

    return normalized_url


def componentise_database_url():
    url = urlparse(os.environ['DATABASE_URL'])
    dbname = url.path[1:]
    user = url.username
    password = url.password
    host = url.hostname
    port = url.port

    components = {
        'user': user,
        'dbname': dbname,
        'password': password,
        'host': host,
        'port': port
    }
    return components


def get_database_url_component(component_name):
    return componentise_database_url()[component_name]
