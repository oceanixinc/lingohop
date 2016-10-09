"""Application URL."""
from django.conf.urls import url

from content.api import (
    ContentCreate, ContentUpdate
)

urlpatterns = [

    url(
        r'^$',
        ContentCreate.as_view(),
        name='content'
    ),

    url(
        r'^(?P<name>\w+)$',
        ContentUpdate.as_view(),
        name='content-update'
    ),
]
