from __future__ import absolute_import, unicode_literals

from django import forms


from django.contrib import admin


from userprofile.models import (
    SubscriptionType, Trip, UserTrip,
    Language,
    LanguageCountry,
    User,)

from django.contrib.auth.admin import UserAdmin as AuthUserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
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


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    pass


@admin.register(LanguageCountry)
class LanguageCountryAdmin(admin.ModelAdmin):
    pass


# @admin.register(User)
# class UserProfileAdmin(admin.ModelAdmin):
#     pass


class MyUserChangeForm(UserChangeForm):
    """User Change Form."""

    class Meta(UserChangeForm.Meta):
        """Meta class for user change form."""

        model = User


class MyUserCreationForm(UserCreationForm):
    """User creation form."""

    error_message = UserCreationForm.error_messages.update({
        'duplicate_username': 'This username has already been taken.'
    })

    def __init__(self, *args, **kwargs):
        """Init class for user creation."""
        super(MyUserCreationForm, self).__init__(*args, **kwargs)
        self.fields['email'].required = True
        self.fields['first_name'].required = True
        self.fields['last_name'].required = True

    class Meta(UserCreationForm.Meta):
        """Meta for user creation form."""

        model = User

    def clean_username(self):
        """Clean username."""
        username = self.cleaned_data["username"]
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return username
        raise forms.ValidationError(self.error_messages['duplicate_username'])

    def clean_email(self):
        """Clean email."""
        email = self.cleaned_data.get('email')
        if email and User.objects.filter(
                email=email).count():
            raise forms.ValidationError(u'Email addresses must be unique.')
        return email

    def save_model(self, request, obj, form, change):
        super(UserAdmin, self).save_model(request, obj, form, change)


class UserAdmin(AuthUserAdmin):
    """User creation form."""

    form = MyUserChangeForm
    add_form = MyUserCreationForm
    add_fieldsets = (
        (
            None,
            {
                'fields':
                (
                    'username',
                    'email',
                    'first_name',
                    'last_name',
                    'password1',
                    'password2',
                ),
            }
        ),
    )

    def user_email(self):
        return self.user.email

    def save_model(self, request, obj, form, change):
        super(UserAdmin, self).save_model(request, obj, form, change)

try:
    admin.site.unregister(User)
except:
    pass
admin.site.register(User, UserAdmin)
