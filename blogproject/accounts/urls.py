from django.urls import path, include
from knox import views as knox_views
from .views import *

urlpatterns = [
  path('', include('knox.urls')),
  path('login', LoginAPI.as_view()),
  path('register', RegisterAPI.as_view()),
  path('user', UserAPI.as_view()),
  path('profile/<int:pk>/', ProfileAPI.as_view()),
  path('logout', knox_views.LogoutView.as_view(), name='knox_logout')
]