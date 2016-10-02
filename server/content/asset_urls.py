"""Application URL."""
from django.conf.urls import url

from content.api import (
    AssetCreate,
)

urlpatterns = [

    url(
        r'^$',
        AssetCreate.as_view(),
        name='triplist'
    ),
]
