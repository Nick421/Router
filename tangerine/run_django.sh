#!/bin/bash

source ./dev_env/bin/activate
echo "Installing dependencies"
pip install --upgrade pip
pip install https://pypi.python.org/packages/source/psycopg2/psycopg2-2.8.tar.gz
pip install -r ./requirements.txt

echo "Migrate"
python manage.py migrate
echo "Starting server"
python manage.py runserver

