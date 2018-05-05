import os


class Config():
    def __init__(self):
        # NOTE: Very weird problem, but os.getenv was failing
        # in Heroku dyno
        try:
            self.DB_URI = os.environ['DATABASE_URL']
        except KeyError:
            self.DB_URI = 'postgresql://localhost/{}'.format(get_user())


def get_user():
    # TODO: this won't work for WindowsOS
    return os.environ['USER']


config = Config()
