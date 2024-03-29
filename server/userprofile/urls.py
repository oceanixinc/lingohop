"""Application URL."""
from django.conf.urls import url

from userprofile.api import (
    UserProfileList, UserProfileDetail,
    UserTrackView, UserDetail,
    ChangePasswordView,
    UserProfileUpdate,
    CheckAuthToken,
    ProfilePictureUpdate,
)

urlpatterns = [

    url(
        r'^$',
        UserProfileList.as_view(),
        name='userprofile'
    ),

    url(
        r'^check-token/$',
        CheckAuthToken.as_view(),
        name='check-token'
    ),

    url(
        r'track/(?P<user__id>\w+)/(?P<trip__id>\w+)/$',
        UserTrackView.as_view(),
        name='usertrack-update'
    ),
    url(
        r'^(?P<pk>\d+)/$',
        UserDetail.as_view(),
        name='user-detail'
    ),

    url(
        r'^update/photo/(?P<username>\w+|[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})$',
        ProfilePictureUpdate.as_view(),
        name='photo-update'
    ),

    url(
        r'^update/(?P<username>\w+|[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})$',
        UserProfileUpdate.as_view(),
        name='userprofile-update'
    ),


    url(
        r'^(?P<username>\w+|[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4})$',
        UserProfileDetail.as_view(),
        name='userprofile-detail'
    ),

   

]
