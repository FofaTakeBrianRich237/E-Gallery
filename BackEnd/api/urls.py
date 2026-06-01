from django.urls import path
from .views import home, get_oeuvres, get_users, get_user, get_comments_Artwork, get_a_oeuvres, get_comments_post, get_post

urlpatterns = [
    path('', home),
    path('users/', get_users),
    path('Artwork/', get_oeuvres),
    path('user/<str:nom>/<str:password>/', get_user),
    path('Artwork/artiste/<str:id_artiste>/', get_a_oeuvres),
    path('Artwork/comments/<str:id_artwork>/', get_comments_Artwork),
    path('post/comments/<str:id_post>/', get_comments_post),
    path('post/', get_post)
]
