from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
  class Meta:
    model = Post
    fields = '__all__'

  # Changes author representation in serializer
  def to_representation(self, instance):
    rep = super(PostSerializer, self).to_representation(instance)
    rep['author'] = instance.author.username
    return rep