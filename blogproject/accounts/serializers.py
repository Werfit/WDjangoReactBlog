from datetime import datetime
from rest_framework import serializers

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = Profile
    fields = ('bio', 'birth_date')


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'email', 'username')


class RegisterSerializer(serializers.ModelSerializer):
  profile = ProfileSerializer(required=True)

  class Meta:
    model = User
    fields = ('id', 'email', 'username', 'password', 'profile')

    extra_kwargs = {
      'password': {
        'write_only': True
      }
    }

  def create(self, validated_data):
    user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

    profile_data = validated_data.pop('profile')
    profile = Profile.objects.create(
      owner = user,
      bio = profile_data['bio'],
      birth_date=profile_data['birth_date']
    )

    return user


class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError('Incorrect Credentials')