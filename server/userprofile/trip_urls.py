"""Application URL."""
from django.conf.urls import url

from userprofile.api import (
    TripList, UserTripUpdate,
)

urlpatterns = [

    url(
        r'^$',
        TripList.as_view(),
        name='triplist'
    ),

    url(
        r'^update/(?P<pk>[0-9]+)$',
        UserTripUpdate.as_view(),
        name='user-trip-update'
    ),
]
