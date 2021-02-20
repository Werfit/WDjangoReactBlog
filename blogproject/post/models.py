from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
  title = models.CharField(max_length=255)
  body = models.TextField()

  author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(blank=True, null=True, auto_now_add=False)

  class Meta:
    ordering = ['-created_at']