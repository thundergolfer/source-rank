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
