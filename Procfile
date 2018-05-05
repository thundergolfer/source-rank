web: gunicorn app:app --log-file=-
worker: python -m worker.process_and_scrape
migrate: flask db migrate
upgrade: flask db upgrade
