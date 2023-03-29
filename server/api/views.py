from django.http import JsonResponse
from .models import Post
from .serializers import PostSerializer, UserSerializer
from django.contrib.auth.models import User


#  Rest FrameWork
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

# Auth Protection

from rest_framework.permissions import IsAuthenticated

def getRoutes(request): 
  
    routes = [
        {
        "route": "/",
        "method": "GET"
        },
        
        {
        "route": "/api",
        "method": "GET"
        },

        {
        "route": "/api/posts/create/",
        "method": "POST",
        "body": "title: string, description: string",
        },


        {
        "route": "/api/posts/",
        "method": "GET"
        },

        {
        "route": "/api/posts/:id",
        "method": "GET"
        },

    ]
    return JsonResponse(routes, safe=False)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getPosts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)


    return Response(serializer.data)



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getPost(request, id):
    try:
       
        post = Post.objects.get(id=id)
        serializer = PostSerializer(post, many=False)

        return Response(serializer.data)

    except Post.DoesNotExist as err:
        return Response({"data": "The Post does not exist"}, status=status.HTTP_404_NOT_FOUND)
   


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createPost(request):
    
    try:
        title = request.data["title"]
        description = request.data["description"]

# TODO add the post current user !!!!!!!!!! VERY IMPORTANT
        new_post = Post.objects.create(title=title, description=description, user=request.user)
        serializer = PostSerializer(new_post)

        return Response({"msg": "Post Created", "data": serializer.data}) 

    except KeyError as err:
        return Response({"title": ["This Field is required"], "description": ["This Field is required"]}, status=status.HTTP_400_BAD_REQUEST)



@api_view(["POST"])
def signup(request):
    try:
        username = request.data["username"]
        email = request.data["email"]
        password = request.data["password"]

        if User.objects.filter(username=username).exists():
            return Response({"data": "The user with the username already exits..."}, status=status.HTTP_409_CONFLICT)
        
        if User.objects.filter(email=email).exists():
            return Response({"data": "The user with the email already exits..."}, status=status.HTTP_409_CONFLICT)

        new_user = User.objects.create_user(username=username, email=email, password=password)

        
        serializer = UserSerializer(new_user)

        return Response({"status": "user Created", "user": serializer.data})

    except KeyError as _:
        return Response({"data": "Data provided for signup is incomplete"}, status=status.HTTP_400_BAD_REQUEST)

