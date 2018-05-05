FROM python:3.6-stretch
WORKDIR /opt/app
RUN pip install pipenv
ADD Pipfile .
ADD Pipfile.lock .
RUN pipenv install --dev
ADD . .
ENTRYPOINT ./docker-entrypoint.sh
