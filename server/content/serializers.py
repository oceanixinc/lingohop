from .models import (
    Asset, Content, Region, AudioImage)

from rest_framework_mongoengine.serializers import (
    DocumentSerializer, EmbeddedDocumentSerializer)


class WordSerializer(EmbeddedDocumentSerializer):

    class Meta:
        model = AudioImage
        fields = ('word', 'images',)
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
        depth = 7


class RegionSerializer(DocumentSerializer):
    # languages = AudioImageSerializer(many=False)

    class Meta:
        model = Region
        # fields = ('country', 'languages',)
        depth = 7
