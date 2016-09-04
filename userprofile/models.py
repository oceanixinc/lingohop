from django.db import models

from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.conf.global_settings import LANGUAGES
from django_countries.fields import CountryField
from autoslug import AutoSlugField

# Create your models here.


class SubscriptionType(models.Model):
    """
    Model to create subscription types.

    :name: Trip name to identify.

    """
    name = models.CharField(max_length=200)
    duration = models.IntegerField(
        null=True,
        verbose_name=_("Subscription duration"),
        # help_text=_("Subscription")
    )
    price = models.FloatField(default=0.0)
    slug = AutoSlugField(
        populate_from='name', always_update=True, unique=True)


class Trip(models.Model):
    """
    Model to create Trip information.

    :name: Trip name to identify.

    """
    name = models.CharField(max_length=200)


class UserTrip(models.Model):
    """
    Model to create Trip information.

    :trip: Trip foreign Key.
    :departure_date: Departure date for particular date

    """
    trip = models.ForeignKey(
        Trip,
        related_name='usertrip')
    departure_date = models.DateTimeField(
        null=True, blank=True)


class LanguageCountry(models.Model):
    """
    Model to create language-country combinations.

    :language: language options.
    :country: country options.

    """
    language = models.CharField(max_length=7, choices=LANGUAGES)
    country = CountryField()


class User(AbstractUser):
    """
    Model to create user profile.

    :user: User, profile has one to one relation with user model.
    :profile_picture: each user has a profile picture.

    """
    profile_picture = models.ImageField(
        upload_to='profiles',
        # validators=[validate_file_extension],
        blank=True, null=True,
        help_text='Maximum file size allowed is 2Mb'
    )
    language_country = models.ManyToManyField(
        LanguageCountry, blank=True,
        related_name='userprofile',
        verbose_name=_("Language Country Information")
    )
    trip = models.ManyToManyField(
        UserTrip, blank=True,
        related_name='userprofile',
        verbose_name=_("Trip Information")
    )
    subscription_type = models.ForeignKey(
        SubscriptionType,
        null=True, blank=True, related_name='userprofile',
    )
