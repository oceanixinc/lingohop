from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView,
)

from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics, status, views
from rest_framework.response import Response

from userprofile.serializers import UserProfileSerializer
from userprofile.models import User, UserTrip

import base64
import os
from django.core.files import File
import uuid
from PIL import Image


class TestFile:
    def __init__(self, name='', size=0, url=''):
        self.name = name
        self.size = size
        self.url = url

    def __eq__(self, other):
        return (
            isinstance(other, TestFile) and
            self.name == other.name and
            self.size == other.size and
            self.url == other.url)


class UserProfileMixin(object):
    """Mixin to inherit from.

    Here we're setting the query set and the serializer
    """

    serializer_class = UserProfileSerializer
    queryset = User.objects.all()


class UserProfileList(UserProfileMixin, ListCreateAPIView):
    """Return a list of userprofiles or create new ones."""

    def post(self, request, *args, **kwargs):
        print (request.data)

        trip = request.data.get('trip', None)
        departure_date = request.data.get('departure_date', None)
        user_trip = UserTrip.objects.create(
            trip_id=int(trip),
            departure_date=departure_date)
        try:
            exist_user = User.objects.get(
                email=request.data.get('email', None))
            error = {}
            error['error'] = 'Email already exist!'
            return Response(
                'User with email already exist!',
                status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            pass
        data = {
            'profile_picture': request.data.get('profile_picture', None),
            'password': request.data.get('password', None),
            'email': request.data.get('email', None),
            'first_name': request.data.get('first_name', None),
            'last_name': request.data.get('last_name', None),
            'language_country': request.data.get('language_country'),
            'trip': [user_trip.id],
            # 'subscription_type': request.data.get('password', None),
            # 'departure_date': request.data.get('departure_date', None),

        }
        serializer = UserProfileSerializer(data=data)
        if serializer.is_valid():
            print ('valid')
            serializer.save()
            return Response(
                serializer.data, status=status.HTTP_201_CREATED)
        else:
            print ('invalid')
            print (serializer.errors)
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserProfileDetail(UserProfileMixin, RetrieveUpdateDestroyAPIView):
    """Return a specific userprofile, update it, or delete it."""

    lookup_field = 'id'


# io = BytesIO(imgdata)
# photo_obj.image.save(fname, File(io))

# imgstr64 = request.data.get('profile_picture', None)
#         print ('image str', imgstr64)
#         my_image = imgstr64.split('base64,')
#         img_ext = my_image[0].split('/')
#         imgdata = base64.b64decode(my_image[1])
#         file_name = str(uuid.uuid4())
#         fname = './media/profiles/%s.%s' % (file_name, img_ext[1])
#         with open(fname, 'wb') as f:
#             f.write(imgdata)
#         print ('type file', type(f))
#         print ('lanageu', request.data.get('language_country'))
#         print ('trip', request.data.get('trip'))
#         # final_file = open(fname)
#         from io import BytesIO
#         thumb = Image()
#         io = BytesIO(imgdata)
#         