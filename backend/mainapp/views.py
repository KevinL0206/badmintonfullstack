from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ClubSerializer, ClubPlayersSerializer,SessionSerializer,SessionPlayersSerializer,matchSerializer,UpdateMatchSerializer
from django.contrib.auth.models import User
from django.utils import timezone
from .models import club,player,match,session
from rest_framework.permissions import IsAuthenticated
from .functions import calcGameElo

class ClubDisplayCreateView(APIView):
    def get(self, request, username, format=None): # this function will return all the clubs created by the user
        user = User.objects.get(username=username)
        clubs = club.objects.filter(clubOrganiser=user)
        serializer = ClubSerializer(clubs, many=True)
        return Response(serializer.data)

    def post(self, request, username, format=None): # this function will create a new club
        #if not request.user.is_authenticated:
            #return Response({'message': 'Unauthorized'}, status=401)
        #if request.user.username != username:
            #return Response({'message': 'Unauthorized'}, status=401)
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
        #if not request.user.is_authenticated:
            #return Response({'message': 'Unauthorized'}, status=401)
        #if request.user.username != username:
            #return Response({'message': 'Unauthorized'}, status=401)
        serializer = ClubPlayersSerializer(data=request.data)
        if serializer.is_valid():
            currentUser = username
            userInstance = User.objects.get(username = currentUser)
            clubInstance = club.objects.get(clubName = clubname,clubOrganiser = userInstance)
            player = serializer.save(club=clubInstance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SessionDisplayCreateView(APIView): # this class will display all the sessions in a club and also add sessions to a club

    def get(self,request,username,clubname,format=None):
        currentUser = username
        userInstance = User.objects.get(username = currentUser)
        clubInstance = club.objects.get(clubName = clubname,clubOrganiser = userInstance)
        sessions = session.objects.filter(club=clubInstance)
        serializer = SessionSerializer(sessions, many=True)
        return Response(serializer.data)
    
    def post(self,request,username,clubname,format=None):
        #if not request.user.is_authenticated:
            #return Response({'message': 'Unauthorized'}, status=401)
        #if request.user.username != username:
            #return Response({'message': 'Unauthorized'}, status=401)
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

class SessionDetailView(APIView): # this class will display all the players and matches in a session

    def get(self,request,username,clubname,year, month, day,format=None):
        currentUser = username
        sessiondate = timezone.datetime(int(year),int(month),int(day))
        userInstance = User.objects.get(username = currentUser)
        clubInstance = club.objects.get(clubName = clubname,clubOrganiser = userInstance)
        sessionInstance = session.objects.get(club=clubInstance,date=sessiondate)
        matchInstance = match.objects.filter(session=sessionInstance)

        serializer = SessionPlayersSerializer(sessionInstance) # return all the players in the session
        matchserializer = matchSerializer(matchInstance,many=True) # return all the matches in the session
        return Response({
            "session":serializer.data,
            "matches":matchserializer.data
        })

class AddPlayerToSessionView(APIView): # this class will add players to a session
    #permission_classes = [IsAuthenticated]
    def post(self,request,username,clubname,year, month, day,format=None): # this function will add players to a session
        #print("user:" ,request.user)
        #if request.user.username != username:
            #return Response({'message': 'Unauthorized'}, status=401)
        serializer = SessionPlayersSerializer(data=request.data)
        currentUser = username
        sessiondate = timezone.datetime(int(year),int(month),int(day))
        userInstance = User.objects.get(username = currentUser)
        clubInstance = club.objects.get(clubName = clubname,clubOrganiser = userInstance)
        sessionInstance = session.objects.get(club=clubInstance,date=sessiondate)

        if serializer.is_valid():
            players = serializer.validated_data['players']
            for playername in players:
                try:
                    playerInstance = player.objects.get(playerName=playername,club=clubInstance)
                    sessionInstance.players.add(playerInstance)
                except:
                    return Response({"detail": f"Player {player} does not exist"}, status=status.HTTP_400_BAD_REQUEST)

            return Response({"detail": "Players added to session"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CreateMatchView(APIView):

    def post(self,request,username,clubname,year, month, day,format=None):

        serializer = matchSerializer(data=request.data)
        currentUser = username
        sessiondate = timezone.datetime(int(year),int(month),int(day))

        userInstance = User.objects.get(username = currentUser)
        clubInstance = club.objects.get(clubName = clubname,clubOrganiser = userInstance)
        sessionInstance = session.objects.get(club=clubInstance,date=sessiondate)
        freePlayers = list(sessionInstance.players.filter(inGameFlag = False).order_by('elo'))

        if len(freePlayers) <4:
            return Response({"detail": "Not enough players to create a match"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            matchPlayers = []
            for _ in range(4):
                if freePlayers:
                    player = freePlayers.pop()
                    player.inGameFlag = True
                    player.save()
                    matchPlayers.append(player)

            newMatchInstance = match.objects.create(
                session = sessionInstance,
                score = '00-00'
            )

            newMatchInstance.team1.add(matchPlayers[0],matchPlayers[3])
            newMatchInstance.team2.add(matchPlayers[1],matchPlayers[2])

            return Response({"detail": "Match created"}, status=status.HTTP_200_OK)

class UpdateMatchView(APIView):

    def post(self,request,username,clubname,year, month, day,matchID,format=None):
        serializer = UpdateMatchSerializer(data=request.data)
        currentUser = username
        sessiondate = timezone.datetime(int(year),int(month),int(day))

        userInstance = User.objects.get(username = currentUser)
        clubInstance = club.objects.get(clubName = clubname,clubOrganiser = userInstance)
        sessionInstance = session.objects.get(club=clubInstance,date=sessiondate)
        matchInstance = match.objects.get(session=sessionInstance,matchID=matchID)

        team1 = matchInstance.team1
        team2 = matchInstance.team2

        #Get player names
        team1_names = [player.playerName for player in team1.all()]
        team2_names = [player.playerName for player in team2.all()]

        if serializer.is_valid() and not matchInstance.completed:
            score = serializer.validated_data['score']
            
            #Get Match Score
            team1Score, team2Score = map(int, score.split('-'))

            if team1Score > 21  and team2Score < 20 or team2Score > 21 and team1Score < 20:
                return Response({"detail": "Invalid score"}, status=status.HTTP_400_BAD_REQUEST)
            if team1Score < 0 or team2Score < 0:
                return Response({"detail": "Invalid score"}, status=status.HTTP_400_BAD_REQUEST)

            #Calculate which team won
            winloss = []
            if team1Score > team2Score:
                winloss = [1,0]
            elif team2Score > team1Score:
                winloss = [0,1]

            matchInstance.score = score
            matchInstance.completed = True
            matchInstance.save()

            #Calculate new ELO rating for each player
            playerOneNewElo,playerTwoNewElo,playerThreeNewElo,playerFourNewElo = calcGameElo(team1,team2,winloss)

            playerOneInstance = player.objects.get(playerName = team1_names[0],club = clubInstance)
            playerTwoInstance = player.objects.get(playerName = team1_names[1],club = clubInstance)
            playerThreeInstance = player.objects.get(playerName = team2_names[0],club = clubInstance)
            playerFourInstance = player.objects.get(playerName = team2_names[1],club = clubInstance)
            
            #Update player ELO
            playerOneInstance.elo = playerOneNewElo
            playerOneInstance.inGameFlag = False
            playerOneInstance.save()

            playerTwoInstance.elo = playerTwoNewElo
            playerTwoInstance.inGameFlag = False
            playerTwoInstance.save()

            playerThreeInstance.elo = playerThreeNewElo
            playerThreeInstance.inGameFlag = False
            playerThreeInstance.save()

            playerFourInstance.elo = playerFourNewElo
            playerFourInstance.inGameFlag = False
            playerFourInstance.save()

            return Response({"detail": "Match updated"}, status=status.HTTP_200_OK)
        else:
            if matchInstance.completed:
                return Response({"detail": "Match already completed"}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)