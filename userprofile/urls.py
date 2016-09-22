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
        r'^(?P<username>\w+|[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})$',
        UserProfileDetail.as_view(),
        name='userprofile-detail'
    ),
]
