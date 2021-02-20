from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

from django.shortcuts import get_object_or_404
from django.utils import timezone

from .serializers import PostSerializer
from .models import Post

class PostViewSet(viewsets.ModelViewSet):
  queryset = Post.objects.all()
  serializer_class = PostSerializer

  # Saves current request user as author
  def perform_create(self, serializer):
    serializer.save(author=self.request.user)

  # PATCH
  def partial_update(self, request, pk=None):
    queryset = Post.objects.all()
    post = get_object_or_404(queryset, pk=pk)

    post.updated_at = timezone.now()
    serializer = self.serializer_class(post, data=request.data, partial=True)

    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)

  # DELETE
  def destroy(self, request, pk=None):
    queryset = Post.objects.all()
    post = get_object_or_404(queryset, pk=pk)
    # Only author can delete
    if request.user.id == post.author.id:
      self.perform_destroy(post)

      return Response(status=status.HTTP_200_OK)
    return Response({
      "detail": "You can delete only your posts"
    }, status=status.HTTP_403_FORBIDDEN)