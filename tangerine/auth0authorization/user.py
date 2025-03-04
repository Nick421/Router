from django.contrib.auth import authenticate

"""
function to extract the HTTP header for userID
"""


def jwt_get_username_from_payload_handler(payload):
    username = payload.get('sub')
    authenticate(remote_user=username)
    return username
