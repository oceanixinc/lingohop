from rest_framework.response import Response
from rest_framework import status
from rest_framework_mongoengine import generics
from .serializers import (
    AssetSerializer,
    ContentSerializer,
    RegionSerializer)

from .models import Asset, Country, Region
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
        # print (request.data.get('file'))
        # print (request.data)
        country = request.data['country']
        print ('country', country)
        data = request.data['languages']
        # a = list(request.data['languages'].keys())[0]
        # b = list(data.keys())[0]
        a = list(data.keys())[0]
        b = list(data[a].keys())[0]
        c = data[a][b]['images']
        d = data[a][b]['audio']['files']
        # print ('files', d)

        for index, each in enumerate(c):
            img = each['file']
            my_image = img.split(';base64,')
            img_ext = my_image[0].split('/')
            print ('data', img_ext)
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
            request.data['languages'][a][b]['images'][index]['file'] = real_file[1]
        for gender in d:
            data = d[gender]
            for index, region in enumerate(data):
                audio_file = data[region]['file']
                if 'base64' in audio_file:
                    my_audio = audio_file.split('base64,')
                    img_ext = my_audio[0].split('/')
                    imgdata = base64.b64decode(my_audio[1])
                    file_name = str(uuid.uuid4())
                    fname = '../media/audios/%s.%s' % (file_name, 'mp3')

                    real_file = fname.split('../')
                    # d64i = bytes(img, 'utf-8')
                    # d64i = bytes(imgdata, 'utf-8')
                    with open(fname, "wb") as fh:
                        # fh.write(base64.decodestring(d64i))
                        fh.write(imgdata)

                    request.data['languages'][a][b]['audio']['files'][gender][region]['file'] = real_file[1]



        # print ('request data', request.data)

        serializer = AssetSerializer(
            data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AssetUpdate(generics.RetrieveUpdateDestroyAPIView):
    """Return a specific asset, update it, or delete it."""
    serializer_class = AssetSerializer
    queryset = Asset.objects.all()

    lookup_field = 'country'


class RegionCreate(generics.ListCreateAPIView):
    serializer_class = RegionSerializer
    queryset = Region.objects.all()


class RegionUpdate(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RegionSerializer
    queryset = Region.objects.all()

    lookup_field = 'language_country'
