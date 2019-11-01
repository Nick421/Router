from django import http
from django.urls import include, path, reverse
from django.utils.encoding import force_text
from rest_framework import status
from rest_framework.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED
from rest_framework.test import APITestCase, URLPatternsTestCase, APIClient
from auth0authorization.models import Auth0User , History, RemoteUserManager
from rest_framework.utils import json
from rest_framework_jwt.settings import api_settings


class ModelTests(APITestCase):

    def test_login_forced(self):
        self.client = APIClient()
        user = Auth0User.objects.create_superuser('username', 'Pas$w0rd')
        self.client.force_authenticate(user)
        response = self.client.post(reverse("login"))
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertJSONEqual(force_text(response.content), {"message": "Authenticated and logged in."})

    def test_login(self):
        self.client = APIClient()
        user = Auth0User.objects.create_superuser('username', 'Pas$w0rd')
        self.client.login(username='username', password='Pas$w0rd')
        response = self.client.post(reverse("login"), format='json', data={"user_id":"username", "password":"Pas$w0rd"}, follow=True)

        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertJSONEqual(force_text(response.content), {"message": "Authenticated and logged in."})

    def test_unauthorized_login(self):
        self.client = APIClient()
        self.client.login(username='username', password='Pas$w0rd')
        response = self.client.post(reverse("login"))
        self.assertEqual(response.status_code, HTTP_401_UNAUTHORIZED)

"""
    def test_create_history(self):
       
        Ensure we can create a new history object.
       
        self.client = APIClient()
        user = Auth0User.objects.create_superuser('username', 'Pas$w0rd')
        self.client.login(username='username', password='Pas$w0rd')
        response = self.client.get(reverse('private_history'))
        self.assertEqual(response.status_code, http.client.NOT_FOUND)

"""
