"""Application URL."""
from django.conf.urls import url

from content.api import (
    ContentCreate,
)

urlpatterns = [

    url(
        r'^$',
        ContentCreate.as_view(),
        name='content'
    ),
]
