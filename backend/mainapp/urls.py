from django.urls import path
from . import views


urlpatterns = [
    path('api/display-create-club/<str:username>/', views.ClubDisplayCreateView.as_view(), name ='displaycreateclub'),
    path('api/display-create-club-players/<str:username>/<str:clubname>/', views.ClubPlayersDisplayCreateView.as_view(), name ='displaycreateclubplayers'),
    path('api/display-create-session/<str:username>/<str:clubname>/', views.SessionDisplayCreateView.as_view(), name ='displaycreatesession'),
]