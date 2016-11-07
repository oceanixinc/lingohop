from .models import (
    Asset, Content, Region, AudioImage, Category)

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
        model = Category
        depth = 7
