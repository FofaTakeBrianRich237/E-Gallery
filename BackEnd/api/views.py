from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Oeuvres, Users, Artiste, Commentaire_artwork, Commentaire_post, Post
# Create your views here.

@api_view(['GET'])
def home(request):
    return Response({
        "message": "Backend Django OK"
    })

@api_view(['GET'])
def get_users(request):
    users = Users.objects()
    data = []

    for u in users:
        data.append({
            "id" : str(u._id),
            "nom" : u.nom,
            "prenom" : u.prenom,
            "email" : u.email,
            "dateInscription" : u.dateInscription,
            "telephone" : u.telephone,
            "categorie" : u.categorie
        })

    return Response(data)

@api_view(['GET'])
def get_oeuvres(request):
    Artworks = Oeuvres.objects()

    data = []

    for art in Artworks:
        data.append({
            "id" : str(art._id),
            "nameArt" : art.nameArt,
            "ImageUrl" : art.ImageUrl,
            "Description" : art.Description,
            "nbr_likes" : art.nbr_likes,
            "nbr_comment" : art.nbr_comment,
            "categorie" : art.categorie,
            "id_artist" : str(art.id_artist)
        })

    return Response(data)

@api_view(['GET'])
def get_user(request, name, password,):
    users = Users.objects()

    data = {}
    try:
        for u in users:
            if u.nom == name and u.motDePasse == password:
                data = {
                    "id" : str(u._id),
                    "name" : u.nom,
                    "prenom" : u.prenom,
                    "email" : u.email,
                    "date_Inscription" : u.dateInscription,
                    "tel" : u.telephone,
                    "categorie" : u.categorie
                }
                if data["categorie"] == "artiste":
                    # a = list(filter(lambda art: art.id_user == u._id, artistes)) #recuperation via function filter
                    a = Artiste.objects.get(id_user = u._id) # recuperation via l'object django
                    data.update({
                        "id_artist" : str(a.id_user),
                        "nbr_oeuvres" : a.nbr_oeuvres,
                        "nbr_followers" : a.nbr_followers,
                        "date_naissance" : a.date_naissance
                    })
    except:
        return Response(
            {"message": "user not found"},
            status=404
        )

    return Response(data) 

@api_view(['GET'])
def get_a_oeuvres(request, id_artiste):
    oeuvres = list(filter(lambda o: o.id_artist == id_artiste, Oeuvres.objects()))

    data = []
    
    for o in oeuvres:
        data.append({
            "id" : str(o._id),
            "name" : o.nameArt,
            "ImageUrl" : o.ImageUrl,
            "nbr_likes" : o.nbr_likes,
            "nbr_comment" : o.nbr.comment,
            "categorie" : o.categorie
        })

    return Response(data)

@api_view(['GET'])
def get_comments_Artwork(request, id_artwork):
    comments = list(filter(lambda c: c.id_artwork == id_artwork, Commentaire_artwork.objects()))

    data = []

    for c in comments:
        data.append({
            "content" : c.content,
            "id_user" : c.id_user
        })

    return Response(data)

@api_view(['GET'])
def get_comments_post(request, id_artwork):
    comments = list(filter(lambda c: c.id_artwork == id_artwork, Commentaire_post.objects()))

    data = []

    for c in comments:
        data.append({
            "content" : c.content,
            "id_user" : c.id_user
        })

    return Response(data)

@api_view(['GET'])
def get_post(request):
    posts = Post.objects()

    data = []
    post = {}

    for p in posts:
        post = {
            "id" : p._id,
            "content" : p.content,
        }
        a = Artiste.objects.get(id = p.id_artist)
        u =  Artiste.objects.get(id = a.id_user)
        post.update({
            "id_artist" : a.id_artist,
            "id_user" : u._id,
            "profil" : u.profilUrl,
            "nom" : u.nom,
            "prenom" : u.prenom 
        })

        data.append(post)
        post.clear()

    return Response(data)

@api_view(['POST'])
def add_user(request):
    user = Users(
        nom = request.data.get("nom")
        prenom = request.data.get("prenom")
        password = request.data.get("password")
        email = request.data.get("email")
        telephone = request.data.get("tel")
        categorie = request.data.get("categorie")
        profilUrl = request.data.get("profil")
    )

    user.save()

    return Response({
        "message" : "user create success",
        "_id" : str(user.id)
    })