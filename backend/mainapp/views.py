from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ClubSerializer, ClubPlayersSerializer,SessionSerializer
from django.contrib.auth.models import User
from django.utils import timezone
from .models import club,player,match,session

class ClubDisplayCreateView(APIView):
    def get(self, request, username, format=None): # this function will return all the clubs created by the user
        user = User.objects.get(username=username)
        clubs = club.objects.filter(clubOrganiser=user)
        serializer = ClubSerializer(clubs, many=True)
        return Response(serializer.data)

    def post(self, request, username, format=None): # this function will create a new club
        serializer = ClubSerializer(data=request.data)
        if serializer.is_valid():
            userInstance = User.objects.get(username=username)
            club = serializer.save(clubOrganiser=userInstance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ClubPlayersDisplayCreateView(APIView): # this class will display all the players in a club and also add players to a club

    def get(self, request, username, clubname, format=None):

        currentUser = username
        userInstance = User.objects.get(username = currentUser)
        clubInstance = club.objects.get(clubName = clubname,clubOrganiser = userInstance)
        players = player.objects.filter(club=clubInstance)
        serializer = ClubPlayersSerializer(players, many=True)
        return Response(serializer.data) 

    def post(self, request, username, clubname, format=None):
        serializer = ClubPlayersSerializer(data=request.data)
        if serializer.is_valid():
            currentUser = username
            userInstance = User.objects.get(username = currentUser)
            clubInstance = club.objects.get(clubName = clubname,clubOrganiser = userInstance)
            player = serializer.save(club=clubInstance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SessionDisplayCreateView(APIView):

    def get(self,request,username,clubname,format=None):
        currentUser = username
        userInstance = User.objects.get(username = currentUser)
        clubInstance = club.objects.get(clubName = clubname,clubOrganiser = userInstance)
        sessions = session.objects.filter(club=clubInstance)
        serializer = SessionSerializer(sessions, many=True)
        return Response(serializer.data)
    
    def post(self,request,username,clubname,format=None):
        serializer = SessionSerializer(data=request.data)

        date = request.data['date']
        currentUser = username
        userInstance = User.objects.get(username = currentUser)
        clubInstance = club.objects.get(clubName = clubname,clubOrganiser = userInstance)

        if session.objects.filter(club = clubInstance,date=date):         
            return Response({"detail": "Session already exists"}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            sessiondata = serializer.save(club=clubInstance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)