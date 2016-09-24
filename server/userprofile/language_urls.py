"""Application URL."""
from django.conf.urls import url

from userprofile.api import (
    LanguageCountryList,
)

urlpatterns = [

    url(
        r'^$',
        LanguageCountryList.as_view(),
        name='languagelist'
    ),
]
