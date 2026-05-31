from django.db import models
from mongoengine import Document, StringField, EmailField, IntField, ObjectIdField, DateField

# Create your models here.
class Users(Document) :
    _id = ObjectIdField()
    nom = StringField(required = True)
    prenom = StringField(required = True)
    email = EmailField()
    motDePasse = StringField()
    dateInscription = DateField()
    telephone = StringField()
    categorie = StringField()

class Oeuvres(Document): 
    _id = ObjectIdField()
    nameArt = StringField(required = True)
    ImageUrl = StringField(required = True)
    Description = StringField(required = True)
    nbr_likes = IntField()
    nbr_comment = IntField()
    categorie = StringField()
    id_artist = ObjectIdField(required = True)

class Post(Document):
    title = StringField(required = True)
    imageUrl = StringField(required = True)
    content = StringField(required = True)
    nbr_likes = IntField()
    nbr_comment = IntField()
    id_artist = ObjectIdField(required = True)

class Artiste(Document):
    _id = ObjectIdField()
    id_user = ObjectIdField()
    nbr_oeuvres = IntField()
    nbr_followers = IntField()
    date_naissance = DateField()

class Follow(Document):
    id_artist = ObjectIdField()
    id_user = ObjectIdField()

class Commentaire_artwork(Document):
    content = StringField()
    id_artwork = ObjectIdField()
    id_user = ObjectIdField()

class Commentaire_post(Document):
    content = StringField()
    id_post = ObjectIdField()
    id_user = ObjectIdField()




