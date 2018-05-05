import os


class Config():
    def __init__(self):
        self.DB_URI = os.getenv(
            'DATABASE_URL',
            'postgresql://localhost/{}'.format(get_user())
        )


def get_user():
    # TODO: this won't work for WindowsOS
    return os.environ['USER']


config = Config()
