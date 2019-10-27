#!/bin/bash

source ./dev_env/bin/activate
echo "Installing dependencies"
pip install --upgrade pip
pip install -r ./requirements.txt

echo "Migrate"
python manage.py migrate
echo "Starting server"
python manage.py runserver

