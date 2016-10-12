from userprofile.models import User


from rest_framework import serializers
from django_countries.serializer_fields import CountryField

from userprofile.models import (
    Trip, LanguageCountry, Language)


# class ChoicesField(serializers.Field):
#     def __init__(self, choices, **kwargs):
#         self._choices = choices
#         super(ChoicesField, self).__init__(**kwargs)

#     def to_representation(self, obj):
#         print ('obj', obj)
#         return self._choices[obj]

#     def to_internal_value(self, data):
#         return getattr(self._choices, data)


class LanguageCountrySerializer(serializers.ModelSerializer):
    # country = CountryField(country_dict=True, required=False)
    language = serializers.CharField(
        source='language.name',
        required=True)
    # country = serializers.CharField(
    #     source='country.name',
    #     required=False, read_only=True)

    class Meta:
        model = LanguageCountry
        fields = ('id', 'country', 'language',)

    def create(self, validated_data):
        language, created = Language.objects.get_or_create(
            name=validated_data['language']['name'])

        validated_data['language'] = language

        return LanguageCountry.objects.create(**validated_data)


class TripSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip


class UserProfileSerializer(serializers.ModelSerializer):
    # trip = TripSerializer()
    full_name = serializers.CharField(
        source='get_full_name',
        required=False, read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            # 'username',
            'password', 'email',
            'first_name', 'last_name',
            'profile_picture',
            'language_country', 'trip',
            'subscription_type',
            'full_name',
        )

    def create(self, validated_data):
        language_country = validated_data.get('language_country')

        trip = validated_data.get('trip')
        # print ('trip is', trip)
        # departure_date = validated_data.get('departure_date')
        # user_trip = UserTrip.objects.create(
        #     trip=trip,
        #     departure_date=departure_date)
        user_data = {
            'username': validated_data.get('email'),
            'password': validated_data.get('password'),
            'email': validated_data.get('email'),
            'first_name': validated_data.get('first_name'),
            'last_name': validated_data.get('last_name'),
        }
        user = User.objects.create_user(**user_data)
        # user, created = User.objects.get_or_create(**user_data)

        user.profile_picture = validated_data.get('profile_picture')
        user.subscription_type = validated_data.get('subscription_type')
        user.save()
        user.language_country.add(*language_country)
        user.save()
        user.trip.add(*trip)
        user.save()

        return user
