"""Application URL."""
from django.conf.urls import url

from userprofile.api import (
    TripList,
)

urlpatterns = [

    url(
        r'^$',
        TripList.as_view(),
        name='triplist'
    ),
]
