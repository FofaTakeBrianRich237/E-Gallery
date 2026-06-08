from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Oeuvres, Users, Artiste, Commentaire_artwork, Commentaire_post, Post

# Helpers internes (sans @api_view, appelables depuis d'autres vues

def _fetch_comments_artwork(id_artwork):
    """Retourne les commentaires d'une oeuvre sans passer par HTTP."""
    comments = list(filter(lambda c: c.id_artwork == id_artwork, Commentaire_artwork.objects()))
    return [{"content": c.content, "id_user": str(c.id_user) if c.id_user else None} for c in comments]

def _fetch_comments_post(id_post):
    """Retourne les commentaires d'un post sans passer par HTTP."""
    comments = list(filter(lambda c: c.id_post == id_post, Commentaire_post.objects()))
    return [{"content": c.content, "id_user": str(c.id_user) if c.id_user else None} for c in comments]

@api_view(['GET'])
def home(request):
    return Response({"message": "Backend Django OK"})


@api_view(['GET'])
def get_users(request):
    users = Users.objects()
    data = []

    for u in users:
        data.append({
            "id":              str(u._id),
            "nom":             u.nom,
            "prenom":          u.prenom,
            "email":           u.email,
            "dateInscription": str(u.dateInscription) if u.dateInscription else None,
            "telephone":       u.telephone,
            "categorie":       u.categorie
        })

    return Response(data)


@api_view(['GET'])
def get_oeuvres(request):
    Artworks = Oeuvres.objects()
    data = []

    for art in Artworks:
        data.append({
            "id":          str(art._id),
            "nameArt":     art.nameArt,
            "ImageUrl":    art.ImageUrl,
            "Description": art.Description,
            "nbr_likes":   art.nbr_likes   if art.nbr_likes   is not None else 0,
            "nbr_comment": art.nbr_comment if art.nbr_comment is not None else 0,
            "categorie":   art.categorie,
            "id_artist":   str(art.id_artist),
            "comments":    _fetch_comments_artwork(art._id),  # ← helper, pas la vue
        })

    return Response(data)


@api_view(['GET'])
def get_user(request, name, password):
    users = Users.objects()
    data = {}

    try:
        for u in users:
            if u.nom == name and u.motDePasse == password:
                data = {
                    "id":               str(u._id),
                    "nom":              u.nom,
                    "prenom":           u.prenom,
                    "email":            u.email,
                    "date_Inscription": str(u.dateInscription) if u.dateInscription else None,
                    "tel":              u.telephone,
                    "categorie":        u.categorie
                }
                if data["categorie"] == "artiste":
                    a = Artiste.objects.get(id_user=u._id)
                    data.update({
                        "id_artist":      str(a.id_user),
                        "nbr_oeuvres":    a.nbr_oeuvres,
                        "nbr_followers":  a.nbr_followers,
                        "date_naissance": str(a.date_naissance) if a.date_naissance else None
                    })
                break  
    except Exception as e:
        return Response({"message": "user not found", "detail": str(e)}, status=404)

    if not data:
        return Response({"message": "user not found"}, status=404)

    return Response(data)


@api_view(['GET'])
def get_a_oeuvres(request, id_artiste):
    oeuvres = list(filter(lambda o: o.id_artist == id_artiste, Oeuvres.objects()))
    data = []

    for o in oeuvres:
        data.append({
            "id":          str(o._id),
            "nameArt":     o.nameArt,
            "ImageUrl":    o.ImageUrl,
            "nbr_likes":   o.nbr_likes   if o.nbr_likes   is not None else 0,
            "nbr_comment": o.nbr_comment if o.nbr_comment is not None else 0,
            "categorie":   o.categorie
        })

    return Response(data)


@api_view(['GET'])
def get_comments_Artwork(request, id_artwork):
    return Response(_fetch_comments_artwork(id_artwork))


@api_view(['GET'])
def get_comments_post(request, id_post):
    return Response(_fetch_comments_post(id_post))


@api_view(['GET'])
def get_post(request):
    posts = Post.objects()
    data = []

    for p in posts:
        try:
            a = Artiste.objects.get(id=p.id_artist)
            u = Users.objects.get(id=a.id_user)  # ✅ Fix 4 : Users pas Artiste
            data.append({
                "id":          str(p._id) if p._id else None,
                "content":     p.content,
                "nbr_likes":   p.nbr_likes   if p.nbr_likes   is not None else 0,
                "nbr_comment": p.nbr_comment if p.nbr_comment is not None else 0,
                "id_artist":   str(a.id),
                "id_user":     str(u._id),
                "profil":      u.profilUrl,
                "nom":         u.nom,
                "prenom":      u.prenom,
                "comments":    _fetch_comments_post(p._id),
            })
        except Exception:
            continue  

    return Response(data)


@api_view(['POST'])
def add_user(request):
    user = Users(
        nom=        request.data.get("nom"),
        prenom=     request.data.get("prenom"),
        motDePasse= request.data.get("password"),  # ✅ Fix 6 : motDePasse pas password
        email=      request.data.get("email"),
        telephone=  request.data.get("tel"),
        categorie=  request.data.get("categorie"),
        profilUrl=  request.data.get("profil")
    )
    user.save()

    return Response({
        "message": "user create success",
        "_id":     str(user.id)
    })