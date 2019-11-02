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

    def test_get_history_response(self):
        self.client = APIClient()
        user = Auth0User.objects.create_superuser('username', 'Pas$w0rd')
        self.client.login(username='username', password='Pas$w0rd')
        self.client.auth = HTTPBasicAuth('username','Pas$w0rd')

        headers = {'content-type': 'application/json'}
        parameter = 'test eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' \
                    '.eyJzdWIiOiJ1c2VybmFtZSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0' \
                    '.sljBMneck0XEniMp0H3zGGterOdOm5YA9MW4AQuE55o '

        response = self.client.get(reverse('private_history'), HTTP_AUTHORIZATION=parameter)
        self.assertEqual(response.status_code, HTTP_200_OK)

    def test_post_invalid_history_response(self):
        self.client = APIClient()
        user = Auth0User.objects.create_superuser('username', 'Pas$w0rd')
        self.client.login(username='username', password='Pas$w0rd')
        self.client.auth = HTTPBasicAuth('username','Pas$w0rd')

        headers = {'content-type': 'application/json'}
        parameter = 'test eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' \
                    '.eyJzdWIiOiJ1c2VybmFtZSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0' \
                    '.sljBMneck0XEniMp0H3zGGterOdOm5YA9MW4AQuE55o '

        data1 = {'source':'uts','destination':'','keyword':'gym'}
        data2 = {'source':'','destination':'ust','keyword':'gym'}
        data3 = {'source':'uts','destination':'dsf','keyword':''}


        response = self.client.post(reverse('private_history'), HTTP_AUTHORIZATION=parameter, data=data1)
        self.assertEqual(response.status_code, HTTP_415_UNSUPPORTED_MEDIA_TYPE)

        response = self.client.post(reverse('private_history'), HTTP_AUTHORIZATION=parameter, data=data2)
        self.assertEqual(response.status_code, HTTP_415_UNSUPPORTED_MEDIA_TYPE)

        response = self.client.post(reverse('private_history'), HTTP_AUTHORIZATION=parameter, data=data3)
        self.assertEqual(response.status_code, HTTP_415_UNSUPPORTED_MEDIA_TYPE)

    def test_post_valid_history_response(self):
        self.client = APIClient()
        user = Auth0User.objects.create_superuser('username', 'Pas$w0rd')
        self.client.login(username='username', password='Pas$w0rd')
        self.client.auth = HTTPBasicAuth('username','Pas$w0rd')

        content_type = {'content-type': 'application/json', 'Accept': 'text/plain'}
        parameter = 'test eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' \
                    '.eyJzdWIiOiJ1c2VybmFtZSIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0' \
                    '.sljBMneck0XEniMp0H3zGGterOdOm5YA9MW4AQuE55o '

        data1 = {'source':'uts',
                 'destination':'burwood',
                 'keyword':'gym'}

        json_data = json.dumps(data1)
        print(type(json_data))

        response = self.client.post(reverse('private_history'), HTTP_AUTHORIZATION=parameter, data=json_data, content_type=content_type)
        self.assertEqual(response.status_code, 200)
