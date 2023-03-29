from django.http import JsonResponse
from .models import Post
from .serializers import PostSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
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
def getPosts(request):
    posts = Post.objects.all()

    serializer = PostSerializer(posts, many=True)


    return Response(serializer.data)



@api_view(["GET"])
def getPost(request, id):
    try:
        post = Post.objects.get(id=id)
        serializer = PostSerializer(post, many=False)

        return Response(serializer.data)

    except Post.DoesNotExist as err:
        return Response({"data": "The Post does not exist"}, status=status.HTTP_404_NOT_FOUND)
   


@api_view(["POST"])
def createPost(request):
    
    try:
        title = request.data["title"]
        description = request.data["description"]

# TODO add the post current user !!!!!!!!!! VERY IMPORTANT
        new_post = Post.objects.create(title=title, description=description)
        serializer = PostSerializer(new_post)

        return Response({"msg": "Post Created", "data": serializer.data}) 
    except KeyError as err:
        return Response({"data": "Required body keys are title and description"}, status=status.HTTP_400_BAD_REQUEST)


    # return Response({"title": title, "description": description})