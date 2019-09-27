from rest_framework import serializers


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
