from rest_framework.response import Response
from rest_framework import status
from rest_framework_mongoengine import generics
from .serializers import (
    AssetSerializer,
    ContentSerializer,
    RegionSerializer,
    WordSerializer)

from .models import (
    Asset, Country, Region, AudioImage)
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


class AssetCreate(generics.ListCreateAPIView):
    serializer_class = AssetSerializer
    queryset = Asset.objects.all()
    # parser_classes = (FileUploadParser,)

    def post(self, request, format=None, *args, **kwargs):
        country = request.data.get('country', None)
        language = request.data.get('language', None)
        words = request.data.get('words', None)
        if country is not None and language is not None and words is not None:
            # for lan_index, each_data in enumerate(data):
            #     a = list(each_data.keys())[0]
            #     words = data[lan_index][a]
            for word_index, each_word in enumerate(words):
                # try:
                b = each_word['word']
                c = each_word['images']
                d = each_word['audio']['files']
                # except:
                    # return Response(
                    #     {'detail': 'data invalid'},
                    #     status=status.HTTP_400_BAD_REQUEST)

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
                            file_name = region + '_' + b
                            fname = '../media/audios/%s.%s' % (file_name, 'mp3')

                            real_file = fname.split('../')
                            # d64i = bytes(img, 'utf-8')
                            # d64i = bytes(imgdata, 'utf-8')
                            with open(fname, "wb") as fh:
                                # fh.write(base64.decodestring(d64i))
                                fh.write(imgdata)
                            request.data['words'][word_index]['audio']['files'][index]['files'][region_index]['file'] = "/" + real_file[1]

                serializer = AssetSerializer(
                    data=request.data
                )
                if serializer.is_valid():
                    serializer.save()
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
        assets = Asset.objects.all()
        total_words = []
        for each_asset in assets:
            languages = each_asset.languages
            for each_language in languages:
                total_words.append(languages[each_language])
            print ('languages', languages)

        return total_words
