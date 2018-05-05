web: gunicorn app:app --log-file=-
worker: python worker/process_articles.py
migrate: flask db migrate
upgrade: flask db upgrade
