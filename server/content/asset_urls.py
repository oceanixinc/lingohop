"""Application URL."""
from django.conf.urls import url

from content.api import (
    AssetCreate, AssetUpdate,
    RegionCreate, RegionUpdate,
    WordApi
)

urlpatterns = [

    url(
        r'^$',
        AssetCreate.as_view(),
        name='asset'
    ),
    url(
        r'word/$',
        WordApi.as_view(),
        name='word'
    ),

    url(
        r'region/(?P<language_country>[-\w]+)/$',
        RegionUpdate.as_view(),
        name='region-update'
    ),


    url(
        r'region/$',
        RegionCreate.as_view(),
        name='region'
    ),

    url(
        r'^(?P<country>\w+)$',
        AssetUpdate.as_view(),
        name='asset-update'
    ),
]
