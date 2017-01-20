"""Application URL."""
from django.conf.urls import url

from userprofile.api import (
    UserProfileList, UserProfileDetail,
    UserTrackView, UserDetail
)

urlpatterns = [

    url(
        r'^$',
        UserProfileList.as_view(),
        name='userprofile'
    ),

    url(
        r'track/(?P<user__id>\w+)/(?P<trip__id>\w+)/$',
        UserTrackView.as_view(),
        name='usertrack-update'
    ),
    url(
        r'^(?P<pk>\d+)/$',
        UserDetail.as_view(),
        name='userprofile-detail'
    ),

    url(
        r'^(?P<username>\w+|[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})$',
        UserProfileDetail.as_view(),
        name='userprofile-detail'
    ),


]
