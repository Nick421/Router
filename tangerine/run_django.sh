#!/bin/bash

source ./dev_env/bin/activate
echo "Installing dependencies"
pip install --upgrade pip
pip install https://pypi.python.org/packages/source/p/psycopg2/psycopg2-2.8.tar.gz
pip install -r ./requirements.txt
pip install django-cors-headers

echo "Migrate"
python manage.py makemigrations
python manage.py migrate
echo "Starting server"
nohup python manage.py runserver 0.0.0.0:8000 </dev/null >/dev/null 2>&1 &

