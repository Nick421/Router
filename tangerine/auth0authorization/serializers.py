from rest_framework import serializers
from .models import History


class HistorySerializers(serializers.Serializer):
    source = serializers.CharField(required=True, max_length=100)
    destination = serializers.CharField(required=True, max_length=100)
    keyword = serializers.CharField(required=True, max_length=100)


class FavouriteSerializers(serializers.Serializer):
    # name = serializers.CharField(required=False, max_length=50, allow_blank=True)
    historyID = serializers.IntegerField(required=True)
