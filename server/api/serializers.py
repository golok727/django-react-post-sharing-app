from rest_framework.serializers import ModelSerializer
from .models import Post
from django.contrib.auth.models import User 

class PostSerializer(ModelSerializer):
  class Meta: 
    model = Post 
    fields = "__all__"




class UserSerializer(ModelSerializer):
    class Meta:
       model = User
       fields = "__all__"
  