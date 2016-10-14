import uuid
# from django.db import models
from mongoengine import (
    Document, EmbeddedDocument,
    DynamicDocument, DynamicEmbeddedDocument)
from mongoengine import fields
# Create your models here.


class Content(EmbeddedDocument):
    """
    """
    question_text = fields.ListField()
    answer_text = fields.ListField()
    variables = fields.ListField()
    rules = fields.ListField()
    # assets = fields.ListField(fields.EmbeddedDocumentField(Asset))


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
    # language = fields.ListField((fields.EmbeddedDocumentField(Language)))


# class Text(EmbeddedDocument):
#     """
#     """
#     name = fields.StringField()
#     categories = fields.ListField(fields.EmbeddedDocumentField(Category))


class Image(EmbeddedDocument):
    """
    """
    ID = fields.UUIDField(binary=False, default=uuid.uuid4)
    file = fields.StringField(required=False, blank=True, null=True)


class Files(EmbeddedDocument):
    region = fields.StringField(required=False, blank=True, null=True)
    file = fields.StringField(required=False, blank=True, null=True)


class AudioFile(EmbeddedDocument):
    gender = fields.StringField(required=False, blank=True, null=True)
    files = fields.ListField(
        fields.EmbeddedDocumentField(Files))


class Audio(EmbeddedDocument):
    """
    """
    ID = fields.UUIDField(binary=False, default=uuid.uuid4)
    files = fields.ListField(
        fields.EmbeddedDocumentField(AudioFile))


class AudioImage(EmbeddedDocument):
    """
    """
    images = fields.ListField(
        fields.EmbeddedDocumentField(Image),
        required=False, blank=True, null=True)
    audio = fields.EmbeddedDocumentField(
        Audio,
        required=False, blank=True, null=True)


class Asset(DynamicDocument):
    """
    """
    country = fields.StringField(max_length=100, unique=True)
    languages = fields.MapField(fields.MapField(
        fields.EmbeddedDocumentField(AudioImage)))


class Region(DynamicDocument):
    """
    """
    language_country = fields.StringField(max_length=100, unique=True)
    regions = fields.ListField()

# class Country(DynamicEmbeddedDocument):
#     """
#     """
#     pass
#     # name = fields.StringField()
#     # spanish = fields.EmbeddedDocumentField(Language)


# class CountryModel(DynamicDocument):
#     pass


# class Asset(EmbeddedDocument):
#     """
#     Assets will be similar across languages, as they directly represent real world objects
#     for example a mango or an apple .
#     Idea is to link these assets to language parts across different languages.
#     Thus assets will exist as independently as first class citizens
#     It may also be a good thing to categorize these assets
#     """
#     id = fields.UUIDField(binary=False, default=uuid.uuid4)
#     name = fields.StringField()
#     description = fields.StringField()
#     language = fields.EmbeddedDocument(Language)
#     country = fields.EmbeddedDocument(Country)
#     category = fields.EmbeddedDocumentField(Category)
#     type = fields.StringField() # Audio or Video
#     object = fields.FileField()

