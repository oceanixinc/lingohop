from django.db import IntegrityError, transaction
from django.db.models import fields
from userprofile.models import User, UserTrack
from content.models import *

from rest_framework import serializers
from django_countries.serializer_fields import CountryField

from userprofile.models import (
    Trip, LanguageCountry, Language, UserTrip)


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
        print ('Language country called', validated_data)
        try:
            asset = Asset.objects.get(
                country=validated_data['country'],
                language=validated_data['language']['name'])
            content = Content.objects.get(
                country=validated_data['country'],
                language=validated_data['language']['name'])
        except:
            pass
        try:
            asset1 = Asset.objects.create(
                country=validated_data['country'])
            asset1.language = validated_data['language']['name']
            asset1.save()

            content1 = Content.objects.create(
                country=validated_data['country'])
            content1.language = validated_data['language']['name']
            content1.save()
        except:
            asset2 = Asset()
            asset2.country = validated_data['country']
            asset2.language = validated_data['language']['name']
            asset2.save()

            content2 = Content()
            content2.country = validated_data['country']
            content2.language = validated_data['language']['name']
            content2.save()

        try:
            region = Region.objects.get(
                language_country=validated_data['language']['name'] + '-' + validated_data['country'])
        except:
            region = Region()
            region.language_country = validated_data['language']['name'] + '-' + validated_data['country']
            region.save()

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
            # 'language_country',
            'trip',
            'subscription_type',
            'full_name',
        )

    def create(self, validated_data):
        # language_country = validated_data.get('language_country')

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
        # user.language_country.add(*language_country)
        # user.save()
        user.trip.add(*trip)
        user.save()
        return user


class UserTripSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserTrip
        fields = ('id', 'xp', 'xp_possible', 'xp_daily',)


class UserTripDetailSerializer(serializers.ModelSerializer):
    trip = TripSerializer(read_only=True)
    language_country = LanguageCountrySerializer(many=True)

    class Meta:
        model = UserTrip
        fields = (
            'id', 'trip', 'xp', 'xp_possible', 'trip_type',
            'departure_date', 'language_country',
            'region')


class UserProfileDetailSerializer(serializers.ModelSerializer):
    # trip = TripSerializer()
    profile_picture = fields.ImageField(
        required=False, max_length=None, allow_null=True,
        allow_empty_file=True, use_url=True)
    trip = UserTripDetailSerializer(many=True)
    full_name = serializers.CharField(
        source='get_full_name',
        required=False, read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            # 'username',
            'email',
            'first_name', 'last_name',
            'profile_picture',
            # 'language_country',
            'trip',
            'subscription_type',
            'full_name',

        )


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    # trip = TripSerializer()
    trip = UserTripDetailSerializer(many=True)
    full_name = serializers.CharField(
        source='get_full_name',
        required=False, read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            # 'username',
            'email',
            'first_name', 'last_name',
            # 'language_country',
            'trip',
            'subscription_type',
            'full_name',

        )

    # def update(self, instance, validated_data):
    #     print('validated_data is', validated_data)
    #     trips_data = validated_data.pop('trip')
    #     print ('trips_data', trips_data)
    #     instance = super(
    #         UserProfileUpdateSerializer, self).update(instance, validated_data)

    #     for trip_data in trips_data:
    #         trip_qs = UserTrip.objects.filter(
    #             trip__name=trip_data['trip']['name'],
    #             language_country__language__name=trip_data['language_country'][0]['language'],
    #             Language_country__country=trip_data['language_country'][0]['country'])

    #         if trip_qs.exists():
    #             trip = trip_qs.first()
    #             if trip.trip_type:
    #                 if trip.trip_type != trip_data['trip_type']:
    #                     trip = UserTrip.objects.create(**trip_data)
    #                 else:
    #                     if trip.region:
    #                         if trip.region != trip_data['region']:
    #                             trip = UserTrip.objects.create(**trip_data)
    #                         else:
    #                             if trip.departure_date:
    #                                 if trip.departure_date\
    #                                         != trip_data['departure_date']:
    #                                     trip = UserTrip.objects.create(
    #                                         **trip_data)

    #         else:
    #             trip = UserTrip.objects.create(**trip_data)

    #         instance.trip.add(trip)

    #     return instance

class UserDataSerializer(serializers.ModelSerializer):
    # trip = TripSerializer()

    class Meta:
        model = User
        fields = (
            'id',
            # 'username',
            'first_name', 'last_name',

        )


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class UserTrackSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserTrack
        fields = (
            'id',
            # 'username',
            'user',
            'trip',
            'status',

        )
