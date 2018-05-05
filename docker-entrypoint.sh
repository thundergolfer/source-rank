if [ ! -f /tmp/ran-setup ]; then
    echo "Setup not run! Running"
    rm -rf migrations/
    pipenv run flask db init
    pipenv run flask db migrate
    pipenv run flask db upgrade
    echo "1" > /tmp/ran-setup
fi

pipenv run python app.py
