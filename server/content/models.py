import uuid
# from django.db import models
from mongoengine import (
    Document, EmbeddedDocument, DynamicDocument, DynamicEmbeddedDocument)
from mongoengine import fields
# Create your models here.


class Content(EmbeddedDocument):
    """
    """
    question_text = fields.ListField()
    answer_text = fields.ListField()
    variables = fields.ListField()
    rules = fields.ListField()


class Part(EmbeddedDocument):
    """
    """
    # name = fields.StringField()
    part1 = fields.EmbeddedDocumentField(Content)
    part2 = fields.EmbeddedDocumentField(Content)


class Lesson(EmbeddedDocument):
    """
    """
    name = fields.StringField()
    parts = fields.EmbeddedDocumentField(Part)


class Category(EmbeddedDocument):
    """
    """
    ID = fields.UUIDField(binary=False, default=uuid.uuid4)
    name = fields.StringField()
    lessons = fields.ListField(fields.EmbeddedDocumentField(Lesson))


class Language(EmbeddedDocument):
    """
    """
    # name = fields.StringField()
    categories = fields.ListField(fields.EmbeddedDocumentField(Category))


class Country(DynamicDocument):
    """
    """
    name = fields.StringField(max_length=100, unique=True)
    languages = fields.MapField(
        fields.EmbeddedDocumentField(Language))
    # name = fields.StringField()
    # spanish = fields.EmbeddedDocumentField(Language)



# class Country(DynamicEmbeddedDocument):
#     """
#     """
#     pass
#     # name = fields.StringField()
#     # spanish = fields.EmbeddedDocumentField(Language)


# class CountryModel(DynamicDocument):
#     pass