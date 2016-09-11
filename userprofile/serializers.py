from userprofile.models import User


from rest_framework import serializers

from django.db import IntegrityError

from userprofile.models import UserTrip, Trip


class TripSerializer(serializers.ModelSerializer):

    class Meta:
        model = Trip


class UserProfileSerializer(serializers.ModelSerializer):
    # trip = TripSerializer()

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
        )

    def create(self, validated_data):
        print ('called', validated_data)
        language_country = validated_data.get('language_country')

        trip = validated_data.get('trip')
        # print ('trip is', trip)
        # departure_date = validated_data.get('departure_date')
        # user_trip = UserTrip.objects.create(
        #     trip=trip,
        #     departure_date=departure_date)
        print ('validated_data', validated_data)
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
