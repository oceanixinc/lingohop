"""Application URL."""
from django.conf.urls import url

from content.api import (
    ContentCreate, ContentUpdate, CategoryApi, JourneyApi, TrackApi
)

urlpatterns = [

    url(
        r'(?P<country>\w+)/(?P<language>\w+)/$',
        ContentCreate.as_view(),
        name='content'
    ),

    url(
        r'^(?P<name>\w+)$',
        ContentUpdate.as_view(),
        name='content-update'
    ),
    url(
        r'category/$',
        CategoryApi.as_view(),
        name='category-list'
    ),
    url(
        r'journey/$',
        JourneyApi.as_view(),
        name='journey-list'
    ),
    url(
        r'track/$',
        TrackApi.as_view(),
        name='track-list'
    ),
]
