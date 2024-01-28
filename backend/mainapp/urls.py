from django.urls import path
from . import views


urlpatterns = [
    path('api/create-club/<str:username>/', views.ClubCreateView.as_view(), name ='createclub'),
]