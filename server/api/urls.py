from django.urls import path 
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path("", views.getRoutes),

    path("posts/", views.getPosts, name="get_post"),
    path("posts/<str:id>", views.getPost, name="get_posts"),

    path("posts/create/", views.createPost, name="create_post"),


    path("signup/", views.signup, name="signup"),


    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]