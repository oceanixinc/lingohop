from django.contrib import admin

from userprofile.models import (
    SubscriptionType, Trip, UserTrip,
    LanguageCountry,
    User,)
# Register your models here.


@admin.register(SubscriptionType)
class SubscriptionTypeAdmin(admin.ModelAdmin):
    pass


@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    pass


@admin.register(UserTrip)
class UserTripAdmin(admin.ModelAdmin):
    pass


@admin.register(LanguageCountry)
class LanguageCountryAdmin(admin.ModelAdmin):
    pass


@admin.register(User)
class UserProfileAdmin(admin.ModelAdmin):
    pass
