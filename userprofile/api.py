from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView,
)

from userprofile.serializers import UserProfileSerializer
from userprofile.models import User


class UserProfileMixin(object):
    """Mixin to inherit from.

    Here we're setting the query set and the serializer
    """

    serializer_class = UserProfileSerializer
    queryset = User.objects.all()


class UserProfileList(UserProfileMixin, ListCreateAPIView):
    """Return a list of userprofiles or create new ones."""

    pass


class UserProfileDetail(UserProfileMixin, RetrieveUpdateDestroyAPIView):
    """Return a specific userprofile, update it, or delete it."""

    lookup_field = 'id'
