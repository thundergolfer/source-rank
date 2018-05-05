web: gunicorn app:app --log-file=-
worker: python worker/process_articles.py
migrate: flask db migrate
upgrade: flask db upgrade
scrape_bias: python -m backend.scraping.media_bias_fact_check_scraper.py
