import datetime
from collections import OrderedDict

from django.db import models
from django.contrib.postgres.fields import JSONField
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
# from django.conf.global_settings import LANGUAGES
from django_countries.fields import CountryField
from autoslug import AutoSlugField



from .managers import UserProfileManager
# Create your models here.


class SubscriptionType(models.Model):
    """
    Model to create subscription types.

    :name: Subscription name to identify. : 1 month
    :duration: Subscription name to identify. : 30
    :price: subscription . : $100

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


class Language(models.Model):
    """
    Model to create languages.

    :code: language unique code.
    :name: language name.

    """
    # code = models.CharField(
    #     max_length=60, unique=True, blank=True)
    name = models.CharField(
        max_length=60, unique=True, blank=True)

    def __str__(self):
        """Default function."""
        return self.name


class LanguageCountry(models.Model):
    """
    Model to create language-country combinations.

    :language: language options.
    :country: country options.

    """
    # language = models.CharField(max_length=7, choices=LANGUAGES)
    language = models.ForeignKey(
        Language,
        null=True, blank=True, related_name='languagecountry',
    )
    country = models.CharField(
        max_length=60, blank=True)

    # def __str__(self):
    #     """Default function."""
    #     return self.language.name


class UserTrip(models.Model):
    """
    Model to create Trip information.

    :trip: Trip foreign Key.
    :departure_date: Departure date for particular date

    """
    trip = models.ForeignKey(
        Trip,
        related_name='usertrip')
    trip_type = models.CharField(
        max_length=200,
        null=True, blank=True)
    departure_date = models.DateTimeField(
        null=True, blank=True)
    language_country = models.ManyToManyField(
        LanguageCountry,
        null=True, blank=True,
        related_name='usertrip',
        verbose_name=_("Language Country Information")
    )
    region = models.CharField(
        max_length=200,
        null=True, blank=True)
    xp = models.PositiveSmallIntegerField(default=0)
    xp_possible = models.PositiveSmallIntegerField(default=0)
    # xp_track = JSONField(blank=True, null=True)
    xp_earned = models.PositiveSmallIntegerField(default=0)
    xp_daily = JSONField(blank=True, null=True)
    # total_xp = models.PositiveSmallIntegerField(default=0)

    def get_weekly_xp(self):
        base = datetime.datetime.now()
        date_list = [base - datetime.timedelta(days=x) for x in range(0, 7)]
        date_list = [x.strftime("%Y-%m-%d") for x in date_list]
        d = self.xp_daily
        data = {}
        for date in date_list:
            try:
                data[date] = d[date]
            except:
                data[date] = 0
        # return data
        return OrderedDict(sorted(data.items()))

    def update_xp_daily(self, xp):
        d = self.xp_daily
        key = datetime.datetime.now().strftime("%Y-%m-%d")
        # key2 = datetime.now() + timedelta(days=1)
        # key2 = key2.strftime("%Y-%m-%d")
        # d['ip'] = ip_address
        print('xp is update called', xp)
        if d:
            if key in d:
                d[key] += xp
            else:
                d[key] = xp
        else:
            d = {}
            d[key] = xp
            # user_trip.xp_daily = data
        self.xp_daily = d
        self.save()


class User(AbstractUser):
    """
    Model to create user profile.

    :user: User, profile has one to one relation with user model.
    :profile_picture: each user has a profile picture.
    :language_country: each user has a profile picture.

    """
    profile_picture = models.ImageField(
        upload_to='profiles',
        # validators=[validate_file_extension],
        blank=True, null=True,
        help_text='Maximum file size allowed is 2Mb'
    )
    trip = models.ManyToManyField(
        UserTrip,
        blank=True,
        related_name='userprofile',
        verbose_name=_("Trip Information")
    )
    subscription_type = models.ForeignKey(
        SubscriptionType,
        null=True, blank=True, related_name='userprofile',
    )
    # objects = UserProfileManager()

    def get_full_name(self):
        if self.first_name:
            f_name = ' '.join(
                [i.capitalize() for i in self.first_name.split(' ')])
            last_name = ' '.join(
                [i.capitalize() for i in self.last_name.split(' ')])
            full_name = [f_name, last_name]
            full_name = ' '.join(
                [i.strip() for i in full_name if i.strip()])
            return full_name
        else:
            return "%s" % (self.username)


     # Meta and String
    class Meta:
        verbose_name = _("User Information")
        verbose_name_plural = _("Users Information")

        permissions = (

            ("create_new_user", "Can create new user"),
        )


class UserTrack(models.Model):
    """
    Model to create user profile.

    :user: User model.
    :trip: particular trip id.
    :status: user in particular trip will have current learning status.

    """
    user = models.ForeignKey(
        User,
        null=True, blank=True, related_name='usertrack',
    )
    trip = models.ForeignKey(
        UserTrip,
        null=True, blank=True, related_name='tracktrip',
    )
    status = JSONField(blank=True, null=True)
