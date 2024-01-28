from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
# Create your views here.

class HomeView(APIView):

    permission_classes = (IsAuthenticated, ) # this will make sure that the user is authenticated  
    def get(self, request):       
        content = {'message': 'Welcome to Badminton Fixtures App!'}   
        return Response(content)
    
class LogoutView(APIView):     
    permission_classes = (IsAuthenticated,)     
    def post(self, request):
        print(request.data)
        try:
            refresh_token = request.data["refresh"]               
            token = RefreshToken(refresh_token)
            print(token)               
            token.blacklist() #blacklist the refresh token to prevent future use            
            return Response(status=status.HTTP_205_RESET_CONTENT)          
        except Exception as e:               
            return Response(status=status.HTTP_400_BAD_REQUEST)