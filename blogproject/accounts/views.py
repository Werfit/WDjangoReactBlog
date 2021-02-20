from rest_framework import generics, permissions, status
from rest_framework.response import Response

from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

from knox.models import AuthToken
from .serializers import *
from .models import Profile


class RegisterAPI(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    return Response({
      "user": UserSerializer(serializer.data, context= self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)[1]
    })


class LoginAPI(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data

    return Response({
      "user": UserSerializer(user, context= self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)[1]
    })


class UserAPI(generics.RetrieveAPIView):
  permission_classes = (permissions.IsAuthenticated, )
  serializer_class = UserSerializer

  def get_object(self): 
    return self.request.user


class ProfileAPI(generics.RetrieveAPIView):
  permission_classes = (permissions.AllowAny, )
  serializer_class = ProfileSerializer

  def get(self, request, *args, **kwargs):
    try:
      profile = Profile.objects.get(owner__id=self.kwargs['pk'])

      return Response({
        "profile": ProfileSerializer(profile).data,
        "username": profile.owner.username
      })
    except ObjectDoesNotExist:
      return Response({
        "detail": "Profile is not found"
      }, status=status.HTTP_404_NOT_FOUND)

