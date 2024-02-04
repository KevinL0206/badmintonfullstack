from rest_framework import serializers
from .models import club,player,session,match

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = club
        exclude = ('clubOrganiser',)

class ClubPlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = player
        fields = ('playerName',)

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = session
        fields = ('date',)    

class matchSerializer(serializers.ModelSerializer):
    class Meta:
        model = match
        fields = ('matchID','team1','team2','score','completed')
        read_only_fields = ('matchID',)

class SessionPlayersSerializer(serializers.ModelSerializer):

    class Meta:
        model = session
        fields = ('players',)

class UpdateMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = match
        fields = ('score',)

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = player
        fields = ('playerName','win','loss','elo')
        read_only_fields = ('playerName',)

class SinglePlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = player
        fields = ('playerName','win','loss','elo','eloHistory','playhistory')
        read_only_fields = ('playerName',)