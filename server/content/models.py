import uuid
# from django.db import models
from mongoengine import (
    Document, EmbeddedDocument,
    DynamicDocument, DynamicEmbeddedDocument)
from mongoengine import fields
# Create your models here.


class Question(EmbeddedDocument):
    """
    """
    question_text = fields.ListField()
    answer_text = fields.ListField()
    variables = fields.ListField()
    images = fields.DictField()
    audio = fields.DictField()
    question_audio = fields.DictField(blank=True, null=True)
    answer_audio = fields.DictField(blank=True, null=True)
    rules = fields.DictField()
    problem_question = fields.StringField(
        required=False, blank=True, null=True)
    problem_image = fields.StringField(
        required=False, blank=True, null=True)
    # assets = fields.ListField(fields.EmbeddedDocumentField(Asset))


class Part(EmbeddedDocument):
    """
    """
    # name = fields.StringField()
    part1 = fields.EmbeddedDocumentField(
        Question,
        required=False, blank=True, null=True
    )
    part2 = fields.EmbeddedDocumentField(
        Question,
        required=False, blank=True, null=True
    )


class Lesson(EmbeddedDocument):
    """
    """
    name = fields.StringField()
    parts = fields.EmbeddedDocumentField(
        Part,
        required=False, blank=True, null=True
    )


class Image(EmbeddedDocument):
    """
    """
    ID = fields.UUIDField(binary=False, default=uuid.uuid4)
    file = fields.StringField(required=False, blank=True, null=True)


class Category(EmbeddedDocument):
    """
    """
    ID = fields.UUIDField(binary=False, default=uuid.uuid4)
    category_name = fields.StringField()
    lessons = fields.ListField(fields.EmbeddedDocumentField(Lesson))


class MainCategory(DynamicDocument):
    """
    Generic list of categories, lessons db will choose from this list and insert into its structure
    """
    ID = fields.UUIDField(binary=False, default=uuid.uuid4)
    name = fields.StringField()
    image = fields.EmbeddedDocumentField(Image, required=False, blank=True, null=True)


class Journey(DynamicDocument):
    """
    Generic list of categories, lessons db will choose from this list and insert into its structure
    """
    ID = fields.UUIDField(binary=False, default=uuid.uuid4)
    name = fields.StringField()


class Track(DynamicDocument):
    """
    Generic list of categories, lessons db will choose from this list and insert into its structure
    """
    ID = fields.UUIDField(binary=False, default=uuid.uuid4)
    name = fields.StringField()


class Language(DynamicEmbeddedDocument):
    """
    """
    # name = fields.StringField()
    categories = fields.ListField(fields.DynamicField(Category))


class Content(DynamicDocument):
    """
    """
    country = fields.StringField(max_length=100)
    language = fields.StringField(max_length=100)
    journeys = fields.DictField()
    # categories = fields.ListField(fields.EmbeddedDocumentField(Category))

    def get_categories(self, journey, region, track):
        categories = self.journeys[journey][region][track]
        all_categories = []
        for each_category in categories:
            all_categories.append(each_category['category_name'])

        return all_categories

    def get_journeys(self):

        return list(self.journeys.keys())

    def get_regions(self, journey):
        journey = self.journeys[journey]
        return list(journey.keys())

    def get_tracks(self, journey, region):
        track = self.journeys[journey][region]
        return list(track.keys())

    def get_lessons(self, journey, region, track, category):
        categories = self.journeys[journey][region][track]
        all_lessons = []
        for each_category in categories:
            if each_category['category_name'] == category:
                lessons = each_category['lessons']
                for each_lesson in lessons:
                    all_lessons.append(each_lesson['name'])

        return all_lessons

    def get_active_categories(self, category):
        categories = self.categories
        for each_category in categories:
            if each_category['category_name'] == category:
                return each_category['lessons']

    def get_active_lessons(self, journey, region, track, category):
        categories = self.journeys[journey][region][track]
        for each_category in categories:
            if each_category['category_name'] == category:
                return each_category['lessons']

    def get_empty_part(self, category, lesson):
        categories = self.categories
        for each_category in categories:
            if each_category['category_name'] == category:
                lessons = each_category['lessons']
                for each_lesson in lessons:
                    if each_lesson['name'] == lesson:
                        parts = each_lesson['parts']
                        if parts['part1'] is None:
                            return 'part1'
                        if parts['part2'] is None:
                            return 'part2'
                        else:
                            return None

    # name = fields.StringField()
    # language = fields.ListField((fields.EmbeddedDocumentField(Language)))


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
    word = fields.StringField(max_length=200)
    images = fields.ListField(
        fields.EmbeddedDocumentField(Image),
        required=False, blank=True, null=True)
    audio = fields.EmbeddedDocumentField(
        Audio,
        required=False, blank=True, null=True)


class AudioImageList(EmbeddedDocument):
    """
    """
    word_list = fields.ListField(
        fields.EmbeddedDocumentField(AudioImage))


class Asset(DynamicDocument):
    """
    """
    country = fields.StringField(max_length=100)
    language = fields.StringField(max_length=100)
    words = fields.ListField(
        fields.EmbeddedDocumentField(AudioImage))

    def get_words(self):
        words = self.words
        all_words = []
        for each_word in words:
            all_words.append(each_word.word)

        return all_words
    #languages = fields.MapField(fields.MapField(
    #fields.EmbeddedDocumentField(AudioImage)))
    # languages = fields.ListField(fields.MapField(
    #     fields.ListField(
    #         fields.EmbeddedDocumentField(AudioImage))))

# Asset.objects.get(country='spain')


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

