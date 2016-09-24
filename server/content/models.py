import uuid
# from django.db import models
from mongoengine import (
    Document, EmbeddedDocument, DynamicDocument, DynamicEmbeddedDocument)
from mongoengine import fields
# Create your models here.


# class Category(models.Model):
#     id = models.UUIDField(
#         primary_key=True, default=uuid.uuid4, editable=False)
#     name = models.CharField(max_length=200)


# class Lesson(models.Model):
#     category = models.ForeignKey(
#         Category,
#         null=True, blank=True, related_name='lesson',
#     )
#     name = models.CharField(max_length=200)

class Part(EmbeddedDocument):
    """
    """
    name = fields.StringField()
    question_text = fields.ListField()
    answer_text = fields.ListField()
    question_text = fields.ListField()


class Lesson(EmbeddedDocument):
    """
    """
    name = fields.StringField()
    parts = fields.EmbeddedDocumentField(Part)


class Category(EmbeddedDocument):
    """
    """
    name = fields.StringField()
    lessons = fields.ListField(fields.EmbeddedDocumentField(Lesson))


class Language(EmbeddedDocument):
    """
    """
    name = fields.StringField()
    category = fields.EmbeddedDocumentField(Category)


class Country(DynamicEmbeddedDocument):
    """
    """
    pass
    # name = fields.StringField()
    # spanish = fields.EmbeddedDocumentField(Language)

    def __unicode__(self):
        return str(self.id)


class CountryModel(DynamicDocument):
    pass