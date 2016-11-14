from .models import (
    Asset, Content, Region, MainCategory,
    AudioImage, Category, Journey, Track)
from rest_framework import serializers
from rest_framework_mongoengine.serializers import (
    DocumentSerializer, EmbeddedDocumentSerializer)


class WordSerializer(EmbeddedDocumentSerializer):
    # gender = serializers.SerializerMethodField('get_gender_name')

    class Meta:
        model = AudioImage
        fields = ('word', 'images', 'audio',)
        depth = 7


class AssetSerializer(DocumentSerializer):
    # languages = AudioImageSerializer(many=False)

    class Meta:
        model = Asset
        # fields = ('Content', 'languages',)
        depth = 7


class ContentSerializer(DocumentSerializer):
    # languages = AudioImageSerializer(many=False)

    class Meta:
        model = Content
        # fields = ('country', 'languages',)
        # extra_kwargs = {'client': {'required': 'False'}}
        extra_kwargs = {
            "words": {
                "audio": {
                    "files": {
                        "files": {
                            "file": {'required': False}
                        }
                    }
                }
            }
        }
        depth = 7


class RegionSerializer(DocumentSerializer):
    # languages = AudioImageSerializer(many=False)

    class Meta:
        model = Region
        # fields = ('country', 'languages',)
        depth = 7


class CategorySerializer(DocumentSerializer):

    class Meta:
        model = MainCategory
        depth = 7


class JourneySerializer(DocumentSerializer):

    class Meta:
        model = Journey
        depth = 7


class TrackSerializer(DocumentSerializer):

    class Meta:
        model = Track
        depth = 7
