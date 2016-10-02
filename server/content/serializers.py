from mongoengine.queryset import DoesNotExist

from rest_framework import serializers
from django.http import Http404

from .models import (Image)


class ImageSerializer(serializers.Serializer):
    name = serializers.ImageField(
        max_length=None, use_url=True)

    # def __init__(self, *args, **kwargs):
    #     # self.request = request
    #     return super(ImageSerializer, self).__init__(*args, **kwargs)

    # def create(self, validated_data):
    #     print ('validated_data', validated_data)
    #     # try:
    #     image = Image()
    #     image.name.put(validated_data['name'])
    #     image.save()
    #     return image


class AudioFileSerializer(serializers.Serializer):
    name = serializers.FileField(
        max_length=None, use_url=True)


class AudioImageSerializer(serializers.Serializer):
    images = ImageSerializer(many=True, required=False)
    audio = AudioFileSerializer(required=False)


class AssetSerializer(serializers.Serializer):
    country = serializers.CharField(allow_blank=True, required=False)
    audio = AudioFileSerializer(required=False)


# class ImageSerializer(serializers.Serializer):
#     name = serializers.ImageField(
#         max_length=None, use_url=True)

#     def __init__(self, *args, **kwargs):
#         # self.request = request
#         return super(ImageSerializer, self).__init__(*args, **kwargs)

#     def create(self, validated_data):
#         print ('validated_data', validated_data)
#         # try:
#         image = Image()
#         image.name.put(validated_data['name'])
#         image.save()
#         return image