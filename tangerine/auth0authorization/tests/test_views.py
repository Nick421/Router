from django import http
from django.urls import include, path, reverse
from django.utils.encoding import force_text
from rest_framework import status
from rest_framework.status import *
from rest_framework.test import APITestCase, URLPatternsTestCase, APIClient
from auth0authorization.models import Auth0User , History, RemoteUserManager
from rest_framework.utils import json
from rest_framework_jwt.settings import api_settings
from requests.auth import HTTPBasicAuth
import json



class viewsTest(APITestCase):


    """
    This method forces authentication and login and checks if the correct message and response is returned
    """
    def test_login_forced(self):
        self.client = APIClient()
        user = Auth0User.objects.create_superuser('username', 'Pas$w0rd')
        self.client.force_authenticate(user)
        response = self.client.post(reverse("login"))
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertJSONEqual(force_text(response.content), {"message": "Authenticated and logged in."})

    """
    This method checks authentication and login and checks if the correct message and response is returned
    """
    def test_login(self):
        self.client = APIClient()
        user = Auth0User.objects.create_superuser('username', 'Pas$w0rd')
        self.client.login(username='username', password='Pas$w0rd')
        response = self.client.post(reverse("login"), format='json', data={"user_id":"username", "password":"Pas$w0rd"}, follow=True)

        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertJSONEqual(force_text(response.content), {"message": "Authenticated and logged in."})

    """
    This method checks for failed authentication and login and checks if the correct message and response is returned
    """

    def test_unauthorized_login(self):
        self.client = APIClient()
        self.client.login(username='username', password='Pas$w0rd')
        response = self.client.post(reverse("login"))
        self.assertEqual(response.status_code, HTTP_401_UNAUTHORIZED)

    """
    This method checks for get history and checks that the correct response is returned
    """
    def test_get_history_response(self):
        self.client = APIClient()
        user = Auth0User.objects.create_superuser('username', 'Pas$w0rd')
        self.client.login(username='username', password='Pas$w0rd')
        self.client.auth = HTTPBasicAuth('username', 'Pas$w0rd')

        headers = {'content-type': 'application/json'}
        parameter = 'test eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' \
                    '.eyJzdWIiOiJ1c2VybmFtZSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0' \
                    '.sljBMneck0XEniMp0H3zGGterOdOm5YA9MW4AQuE55o '

        response = self.client.get(reverse('private_history'), HTTP_AUTHORIZATION=parameter)
        self.assertEqual(response.status_code, HTTP_200_OK)




