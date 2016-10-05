from rest_framework.response import Response
from rest_framework import generics, permissions, status
from .serializers import (
    TestSerializer,
    ContentSerializer)

from .models import Asset, Country
from rest_framework.parsers import FileUploadParser
import base64
import uuid


class ContentCreate(generics.ListCreateAPIView):
    serializer_class = ContentSerializer
    queryset = Country.objects.all()

    # def post(self, request, format=None, *args, **kwargs):
    #     serializer = AudioImageSerializer(
    #         data=request.data
    #     )
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AssetCreate(generics.ListCreateAPIView):
    serializer_class = TestSerializer
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

        for index, each in enumerate(c):
            img = each['file']

            # print (img)
            file_name = str(uuid.uuid4())
            # import os
            # print (os.getcwd())
            fname = '../media/profiles/%s.%s' % (file_name, 'png')
            real_file = fname.split('../')
            # print ('file name', fname)
            d64i = bytes(img, 'utf-8')
            with open(fname, "wb") as fh:
                fh.write(base64.decodestring(d64i))
                # fh.write(d64i)
            # fh.write(img.decode('base64'))
            request.data['languages'][a][b]['images'][index]['file'] = real_file[1]
        print ('request data', request.data)

        serializer = TestSerializer(
            data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
