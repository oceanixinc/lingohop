from .models import (
    Asset, Country, Region)

from rest_framework_mongoengine.serializers import (
    DocumentSerializer,)


class AssetSerializer(DocumentSerializer):
    # languages = AudioImageSerializer(many=False)

    class Meta:
        model = Asset
        # fields = ('country', 'languages',)
        depth = 7


class ContentSerializer(DocumentSerializer):
    # languages = AudioImageSerializer(many=False)

    class Meta:
        model = Country
        # fields = ('country', 'languages',)
        depth = 7


class RegionSerializer(DocumentSerializer):
    # languages = AudioImageSerializer(many=False)

    class Meta:
        model = Region
        # fields = ('country', 'languages',)
        depth = 7
