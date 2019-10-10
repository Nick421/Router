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

from .models import Auth0User, History, Favourite
from .serializers import HistorySerializers, FavouriteSerializers


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
return an array of JSON of previous routes

@POST
store the route and return route id
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

    if request.method == 'POST':
        # validating the JSON before adding in to the database
        valid_data = HistorySerializers(data=request.data)
        if valid_data.is_valid():
            # print("data is valid!")
            post_data = valid_data.validated_data
            user = Auth0User(subject=user_id)
            # construct the database entry
            hist = History(
                source=post_data['Source'], destination=post_data['Destination'], keyword=post_data['Keyword'],
                userID=user)
            # save to database
            hist.save()
            # print(hist.historyID)
        else:
            # raise error if data is not valid
            raise APIException(valid_data.errors)
        return JsonResponse({'route ID': hist.historyID})

    return_data = list(History.objects.filter(userID=user_id).values(
        'historyID', 'source', 'destination', 'keyword', 'date'))
    return JsonResponse(return_data, safe=False)


# TODO
"""
This method will parse the token to get subject to store as user_id
Then it will query the database for history table using user_id as foreign key

@GET
return an array of JSON of favourite routes

@POST
store the user_id and history_id 
"""


def getHist(histID):
    return list(History.objects.filter(historyID='historyID').values('source', 'destination', 'keyword'))


@api_view(["GET", "POST"])
# @requires_scope("read:favourite")
def private_favourite(request):
    # Decode the token
    token = get_token_auth_header(request)
    decoded = jwt.decode(token, None, None)
    # get subject part of the token to be part of the pk
    user_id = decoded.get('sub')

    if request.method == 'POST':
        # validating the JSON before adding in to the database
        valid_data = FavouriteSerializers(data=request.data)
        if valid_data.is_valid():
            # print("data is valid!")
            post_data = valid_data.validated_data
            user = Auth0User(subject=user_id)
            # construct the database entry
            fav = Favourite(
                userID=user, historyID=post_data['HistoryID'], name=post_data['Name'])
            # save to database
            fav.save()
            # print(hist.historyID)
        else:
            # raise error if data is not valid
            raise APIException(valid_data.errors)
        return JsonResponse({'fav ID': fav.id})

    return_data = list()

    for fav in Favourite.objects.filter(userID=user_id):
        fav_list = list()
        fav_list.append(fav.name)
        fav_list.append([fav.historyID.historyID,fav.historyID.source, fav.historyID.destination, fav.historyID.keyword])
        return_data.append(fav_list)

    return JsonResponse(return_data, safe=False)
