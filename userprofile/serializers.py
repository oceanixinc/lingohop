from userprofile.models import User


from rest_framework import serializers

from userprofile.models import UserTrip


class UserProfileSerializer(serializers.ModelSerializer):

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
        language_country = validated_data.get('language_country')

        trip = validated_data.get('trip')
        departure_date = validated_data.get('departure_date')
        user_trip = UserTrip.objects.create(
            trip=trip,
            departure_date=departure_date)
        user_data = {
            'username': validated_data.get('email'),
            'password': validated_data.get('password'),
            'email': validated_data.get('email'),
            'first_name': validated_data.get('first_name'),
            'last_name': validated_data.get('last_name'),
        }
        user = User.objects.create_user(**user_data)
        user.profile_picture = validated_data.get('profile_picture')
        user.subscription_type = validated_data.get('subscription_type')
        user.save()
        user.language_country.add(*language_country)
        user.save()
        user.trip.add(*user_trip)
        user.save()

        return user
