#!/bin/bash

source ./dev_env/bin/activate
echo "Installing dependencies"
pip install --upgrade pip
pip install -r ./requirements.txt

echo "Make migrations"
python manage.py makemigrations
echo "Make migrate"
python manage.py migrate
echo "Starting server"
python manage.py runserver

