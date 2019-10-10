from rest_framework import serializers
from .models import History


def check_malicious_string(str):
    # TODO
    check_SQL_injection(str)


def check_SQL_injection(str):
    # TODO
    raise serializers.ValidationError


class HistorySerializers(serializers.Serializer):
    Source = serializers.CharField(required=True, max_length=100)
    Destination = serializers.CharField(required=True, max_length=100)
    Keyword = serializers.CharField(required=True, max_length=100)

    # read_only=True


class FavouriteSerializers(serializers.Serializer):
    Name = serializers.CharField(required=False, max_length=50, allow_blank=True)
    HistoryID = serializers.SlugRelatedField(slug_field='historyID', queryset=History.objects.all())
   # userID = serializers.SlugRelatedField(slug_field='userID', queryset=History.objects.all())



