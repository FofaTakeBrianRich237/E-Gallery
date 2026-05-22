from django.db import models
from mongoengine import Document, StringField, EmailField, IntField

# Create your models here.
class User(Document) :
    name = StringField(required = True)