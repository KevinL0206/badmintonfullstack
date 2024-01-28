from rest_framework import serializers
from .models import club,player

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = club
        exclude = ('clubOrganiser',)

class ClubPlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = player
        fields = ('playerName',)
    