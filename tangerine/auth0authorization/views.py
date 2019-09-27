import os
import jwt
import json
from functools import wraps

from django.http import JsonResponse
from rest_framework.decorators import parser_classes
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.exceptions import APIException
from six.moves.urllib import request as req
from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend


from .models import User
from .serializers import HistorySerializers


def get_token_auth_header(request):
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.META.get("HTTP_AUTHORIZATION", None)
    parts = auth.split()
    token = parts[1]

    return token


def requires_scope(required_scope):
    """Determines if the required scope is present in the Access Token
    Args:
        required_scope (str): The scope required to access the resource
    """

    def require_scope(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = get_token_auth_header(args[0])
            unverified_claims = jwt.get_unverified_claims(token)
            token_scopes = unverified_claims["scope"].split()
            for token_scope in token_scopes:
                if token_scope == required_scope:
                    return f(*args, **kwargs)
            response = JsonResponse(
                {"message": "You don't have access to this resource"}
            )
            response.status_code = 403
            return response

        return decorated

    return require_scope


def public(request):
    return JsonResponse(
        {
            "message": "Hello from a public endpoint! You don't need to be authenticated to see this."
        }
    )


@api_view(["POST"])
def login(request):
    return JsonResponse(
        {
            "message": "Authenticated and logged in."
        }
    )


"""
This method will parse the token to get subject to store as user_id
Then it will query the database for history table using user_id as foreign key

@GET 
return an array of JSON of previous route

@POST
store the route 
"""


@api_view(["GET", "POST"])
@parser_classes([JSONParser])
# @requires_scope("read:history")
def private_history(request):
    # Decode the token
    token = get_token_auth_header(request)
    decoded = jwt.decode(token, None, None)
    # get subject part of the token as our pk
    user_id = decoded.get('sub')
    # this fetch the data associated with user in table auth0authorization_user with same pk
    print(User.objects.get(subject=user_id))

    """
    Currently dummy response and data will add proper database interaction 
    """
    # TODO
    if request.method == 'POST':
         # validating the JSON before adding in to the database
        valid_data = HistorySerializers(data=request.data)
        if valid_data.is_valid():
            # TODO add to database
            post_data = valid_data.validated_data
        else:
            # print(valid_data.errors)
            raise APIException(valid_data.errors)
        return JsonResponse({'received data': request.data})

    return JsonResponse({
        'Route 1': {
            "Source": "UTS",
            "Destination": "Central station",
            "Keyword": "food"
        },
        'Route 2': {
            "Source": "USYD",
            "Destination": "Townhall station",
            "Keyword": "bar"
        },
        'Route 3': {
            "Source": "Campsie station",
            "Destination": "Canterbury station",
            "Keyword": "gym"
        }
    })

# TODO


@api_view(["GET", "POST"])
# @requires_scope("read:favourite")
def private_favourite(request):
    return JsonResponse(
        "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
    )
