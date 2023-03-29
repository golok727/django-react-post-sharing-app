from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Post(models.Model):
  user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
  title = models.CharField(max_length=200)
  description = models.TextField(null=True, blank=True)
  likes = models.IntegerField(default=0)
  created = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  
  def __str__(self):
    return self.title
  
   


