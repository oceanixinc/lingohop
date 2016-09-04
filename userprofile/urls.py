"""Application URL."""
from django.conf.urls import url

from userprofile.api import (
    UserProfileList, UserProfileDetail,
)

urlpatterns = [

    url(
        r'^$',
        UserProfileList.as_view(),
        name='userprofile'
    ),
    url(
        r'^(?P<id>[0-9]+)$',
        UserProfileDetail.as_view(),
        name='userprofile-detail'
    ),
]
