from rest_framework import serializers
from .models import History

"""
Serializer for History object 
Checks if the JSON recevived conforms to the model we define for database
"""


class HistorySerializers(serializers.Serializer):
    source = serializers.CharField(required=True, max_length=100)
    destination = serializers.CharField(required=True, max_length=100)
    keyword = serializers.CharField(required=True, max_length=100)


"""
Serializer for Favourite object 
Checks if the JSON recevived conforms to the model we define for database
"""


class FavouriteSerializers(serializers.Serializer):
    historyID = serializers.IntegerField(required=True)
