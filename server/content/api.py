from rest_framework.response import Response
from rest_framework import status
from rest_framework_mongoengine import generics
from .serializers import (
    AssetSerializer,
    ContentSerializer,
    RegionSerializer,
    WordSerializer)

from django.shortcuts import get_object_or_404
from django.http import Http404

from .models import (
    Asset, Country, Region, AudioImage,
    Image, Files, AudioFile, Audio)
# from rest_framework.parsers import FileUploadParser
import base64
import uuid


class ContentCreate(generics.ListCreateAPIView):
    serializer_class = ContentSerializer
    queryset = Country.objects.all()


class ContentUpdate(generics.RetrieveUpdateDestroyAPIView):
    """Return a specific asset, update it, or delete it."""
    serializer_class = ContentSerializer
    queryset = Country.objects.all()

    lookup_field = 'name'


def get_obj_or_404(klass, *args, **kwargs):
    try:
        return klass.objects.get(*args, **kwargs)
    except klass.DoesNotExist:
        raise Http404


class MultipleFieldLookupMixin(object):
    """
    Apply this mixin to any view or viewset to get multiple field filtering
    based on a `lookup_fields` attribute, instead of the default single field filtering.
    """

    def get_object(self):
        queryset = self.get_queryset()             # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        filter = {}
        for field in self.lookup_fields:
            if self.kwargs[field]:  # Ignore empty fields.
                filter[field] = self.kwargs[field]
        return get_obj_or_404(Asset, **filter)  # Lookup the object


class AssetCreate(MultipleFieldLookupMixin, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AssetSerializer
    queryset = Asset.objects.all()

    lookup_fields = ('country', 'language')
    # parser_classes = (FileUploadParser,)

    def get_audio_image(self, data):
        print ('data is', data)
        word = data['word']
        images = data['images']
        audio = data['audio']['files']
        image_list = []
        for each_image in images:
            file = each_image['file']
            image = Image()
            image.file = file
            image_list.append(image)
        audio_file_list = []
        for index, each_row in enumerate(audio):
            gender = each_row['gender']
            audio_file = AudioFile()
            audio_file.gender = gender
            region_files = each_row['files']
            for region_index, each_region in enumerate(region_files):
                region = each_region['region']
                region_file = each_region['file']
                audio_files = Files()
                audio_files.region = region
                audio_files.file = region_file
                audio_file.files.append(audio_files)
            audio_file_list.append(audio_file)

        audio1 = Audio()
        audio1.files = audio_file_list
        audio_image = AudioImage()
        audio_image.word = word
        audio_image.images = image_list
        audio_image.audio = audio1

        return audio_image

    def put(self, request, *args, **kwargs):
        country = request.data.get('country', None)
        language = request.data.get('language', None)
        words = request.data.get('words', None)
        if country is not None and language is not None and words is not None:
            # for lan_index, each_data in enumerate(data):
            #     a = list(each_data.keys())[0]
            #     words = data[lan_index][a]
            for word_index, each_word in enumerate(words):
                try:
                    b = each_word['word']
                    c = each_word['images']
                    d = each_word['audio']['files']
                except:
                    return Response(
                        {'detail': 'data invalid'},
                        status=status.HTTP_400_BAD_REQUEST)

                for index, each in enumerate(c):
                    img = each['file']
                    if 'base64' in img:
                        my_image = img.split(';base64,')
                        img_ext = my_image[0].split('/')
                        imgdata = base64.b64decode(my_image[1])
                        file_name = str(uuid.uuid4())
                        fname = '../media/images/%s.%s' % (file_name, img_ext[1])

                        # file_name = str(uuid.uuid4())
                        # fname = '../media/profiles/%s.%s' % (file_name, 'png')

                        real_file = fname.split('../')
                        # d64i = bytes(img, 'utf-8')
                        # d64i = bytes(imgdata, 'utf-8')
                        with open(fname, "wb") as fh:
                            # fh.write(base64.decodestring(d64i))
                            fh.write(imgdata)
                            # fh.write(d64i)
                        # fh.write(img.decode('base64'))
                        request.data['words'][word_index]['images'][index]['file'] = "/" + real_file[1]
                    else:
                        return Response(
                            {'detail': 'binary image not provided'},
                            status=status.HTTP_400_BAD_REQUEST)

                for index, each_row in enumerate(d):
                    gender = each_row['gender']
                    region_files = each_row['files']
                    for region_index, each_region in enumerate(region_files):
                        region = each_region['region']
                        region_file = each_region['file']
                        if 'base64' in region_file:
                            my_audio = region_file.split('base64,')
                            img_ext = my_audio[0].split('/')
                            imgdata = base64.b64decode(my_audio[1])
                            file_name = gender + '_ ' + region + '_' + b
                            fname = '../media/audios/%s.%s' % (file_name, 'mp3')

                            real_file = fname.split('../')
                            # d64i = bytes(img, 'utf-8')
                            # d64i = bytes(imgdata, 'utf-8')
                            with open(fname, "wb") as fh:
                                # fh.write(base64.decodestring(d64i))
                                fh.write(imgdata)
                            request.data['words'][word_index]['audio']['files'][index]['files'][region_index]['file'] = "/" + real_file[1]

                asset = Asset.objects.filter(
                    country=country,
                    language=language)
                # if asset:
                audio_image = self.get_audio_image(
                    request.data['words'][0])
                asset[0].update(push__words=audio_image)

                #     print (word_serializer.errors)
                # else:
                serializer = AssetSerializer(
                    asset[0],
                    data=request.data,
                    partial=True
                )
                if serializer.is_valid():
                    # serializer.save()
                    return Response(
                        serializer.data, status=status.HTTP_201_CREATED)
                return Response(
                    serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {'detail': 'country or languages data not provided'},
            status=status.HTTP_400_BAD_REQUEST)


class AssetUpdate(generics.RetrieveUpdateDestroyAPIView):
    """Return a specific asset, update it, or delete it."""
    serializer_class = AssetSerializer
    queryset = Asset.objects.all()

    lookup_field = 'country'

    # def put(self, request, *args, **kwargs):
    #     print ('put request')


class RegionCreate(generics.ListCreateAPIView):
    serializer_class = RegionSerializer
    queryset = Region.objects.all()


class RegionUpdate(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RegionSerializer
    queryset = Region.objects.all()

    lookup_field = 'language_country'


class WordApi(generics.ListAPIView):
    serializer_class = WordSerializer
    # queryset = AudioImage.objects.all()

    def get_queryset(self):
        """
        This view should return a list of words.
        """
        q = self.request.GET.get('q', None)
        country = self.request.GET.get('country', None)
        language = self.request.GET.get('language', None)
        # assets = Asset.objects.filter(
        #     country='spain',
        #     words__match={"word": q})
        asset = Asset.objects.get(
            country=country,
            language=language)
            # words__word__icontains=q).only('words')
        total_words = []
        if q:
            for each_word in asset.words:
                if each_word.word.startswith(q):
                    total_words.append(each_word)

        return total_words
        # return a.words
