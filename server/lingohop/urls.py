"""lingohop URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.views.generic import TemplateView

# from userprofile import trip_urls, language_urls

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^', include('django.contrib.auth.urls')),
    url(
        r'^(?i)api/profiles/',
        include('userprofile.urls', namespace="profile")),
    url(
        r'^(?i)api/trips/',
        include('userprofile.trip_urls', namespace="trip")),
    url(
        r'^(?i)api/assets/',
        include('content.asset_urls', namespace="asset")),
    url(
        r'^(?i)api/contents/',
        include('content.content_urls', namespace="content")),
    url(
        r'^(?i)api/language-country/',
        include('userprofile.language_urls', namespace="language")),
    url(
        r'^[a-zA-Z0-9_.-]*$', TemplateView.as_view(template_name='index.html'),
        name="home"
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
