from django.shortcuts import get_object_or_404
from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView,
    RetrieveAPIView)

from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics, status, views, permissions
from rest_framework.response import Response

from userprofile.serializers import (
    UserProfileSerializer, TripSerializer,
    LanguageCountrySerializer, UserTripSerializer,
    UserProfileDetailSerializer,
    UserTrackSerializer, UserDataSerializer,
    ChangePasswordSerializer,
    UserProfileUpdateSerializer,
)
from userprofile.models import (
    User, UserTrip, Language,
    Trip, LanguageCountry, UserTrack)
from content.models import Asset


class TripMixin(object):
    """Mixin to inherit from.

    Here we're setting the query set and the serializer
    """

    serializer_class = TripSerializer
    queryset = Trip.objects.all()


class TripList(TripMixin, ListCreateAPIView):
    """Return a list of trips or create new ones."""
    pass


class LanguageCountryMixin(object):
    """Mixin to inherit from.

    Here we're setting the query set and the serializer
    """

    serializer_class = LanguageCountrySerializer
    # queryset = LanguageCountry.objects.all()

    def get_queryset(self):
        """
        This view should return a list of sections.
        """
        # print
        my_kwargs = {}
        assets = Asset.objects.all()
        country = []
        language = []
        for each_asset in assets:
            country.append(each_asset.country)
            language.append(each_asset.language)
        my_kwargs['language__name__in'] = language
        my_kwargs['country__in'] = country
        print (my_kwargs)
        data = LanguageCountry.objects.filter(
            **my_kwargs).select_related(
            'language__name').order_by('country')
        return data


class LanguageCountryList(LanguageCountryMixin, ListCreateAPIView):
    """Return a list of language-countries or create new ones."""
    pass


class UserProfileMixin(object):
    """Mixin to inherit from.

    Here we're setting the query set and the serializer
    """

    serializer_class = UserProfileSerializer
    queryset = User.objects.all()


class UserProfileList(UserProfileMixin, ListCreateAPIView):
    """Return a list of userprofiles or create new ones."""

    def post(self, request, *args, **kwargs):
        trip = request.data.get('trip', None)
        departure_date = request.data.get('departure_date', None)
        trip_type = request.data.get('trip_type', None)
        region = request.data.get('region', None)
        user_trip = UserTrip.objects.create(
            trip_id=int(trip),
            departure_date=departure_date,
            trip_type=trip_type,
            region=region)
        language_country = list(map(int, request.data.get('language_country')))
        user_trip.language_country.add(*language_country)
        # user.save()
        try:
            exist_user = User.objects.get(
                email=request.data.get('email', None))
            error = {}
            error['error'] = 'Email already exist!'
            return Response(
                'User with email already exist!',
                status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            pass
        data = {
            'profile_picture': request.data.get('profile_picture', None),
            'password': request.data.get('password', None),
            'email': request.data.get('email', None),
            'first_name': request.data.get('first_name', None),
            'last_name': request.data.get('last_name', None),
            # 'language_country': language_country,
            'trip': [user_trip.id],
            # 'subscription_type': request.data.get('password', None),
            # 'departure_date': request.data.get('departure_date', None),

        }
        serializer = UserProfileSerializer(data=data)
        if serializer.is_valid():
            print ('valid')
            serializer.save()
            new_user = User.objects.get(
                email=request.data.get('email', None))
            user_track = UserTrack()
            user_track.user = new_user
            user_track.trip = user_trip
            user_track.save()
            return Response(
                serializer.data, status=status.HTTP_201_CREATED)
        else:
            print ('invalid')
            print (serializer.errors)
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(RetrieveUpdateDestroyAPIView):
    """Return a specific userprofile, update it, or delete it."""
    serializer_class = UserDataSerializer
    queryset = User.objects.all()
    lookup_field = 'pk'


class ChangePasswordView(RetrieveUpdateDestroyAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    queryset = User.objects.all()
    # permission_classes = (permissions.IsAuthenticated,)
    lookup_field = 'pk'

    # def get_object(self, queryset=None):
    #     obj = self.request.user
    #     return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response("Success.", status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileDetail(RetrieveUpdateDestroyAPIView):
    """Return a specific userprofile, update it, or delete it."""
    serializer_class = UserProfileDetailSerializer
    queryset = User.objects.all()
    lookup_field = 'username'


class UserProfileUpdate(RetrieveUpdateDestroyAPIView):
    """Return a specific userprofile, update it, or delete it."""
    serializer_class = UserProfileUpdateSerializer
    queryset = User.objects.all()
    lookup_field = 'username'

    def put(self, request, *args, **kwargs):
        user_profile = self.get_object()
        print('user_profile is', user_profile, type(user_profile))

        email = request.data.get('email', None)
        first_name = request.data.get('first_name', None)
        last_name = request.data.get('last_name', None)
        trips_data = request.data.get('trip', None)
        subscription_type = request.data.get('subscription_type', None)

        # user = User.objects.get(id=request.data.get('id'))
        user_profile.first_name = first_name
        user_profile.last_name = last_name
        user_profile.save()
        user_profile.subscription_type = subscription_type
        user_profile.save()
        for trip_data in trips_data:
            journey_obj = Trip.objects.get(
                name=trip_data['trip']['name'])
            language_country_obj = LanguageCountry.objects.filter(
                language__name=trip_data['language_country'][0]['language'],
                country=trip_data['language_country'][0]['country']
            )
            # user_trip.language_country.add(*language_country)
            if language_country_obj:
                language_country_obj = language_country_obj[0]
                trip_qs = UserTrip.objects.filter(
                    userprofile__id=user_profile.id,
                    trip=journey_obj,
                    language_country=language_country_obj)

                user_trip_data = {
                    'trip': journey_obj,
                    'trip_type': trip_data['trip_type'],
                    'departure_date': trip_data['departure_date'],
                    'region': trip_data['region'],
                    'xp': trip_data['xp']
                }
                trip_obj = None
                if trip_qs.exists():
                    trip = trip_qs.first()
                    if trip.trip_type:
                        if trip.trip_type != trip_data['trip_type']:
                            trip_obj = UserTrip.objects.create(**user_trip_data)
                            trip_obj.language_country.add(language_country_obj)
                        else:
                            if trip.region:
                                if trip.region != trip_data['region']:
                                    trip_obj = UserTrip.objects.create(
                                        **user_trip_data)
                                    trip_obj.language_country.add(language_country_obj)
                                else:
                                    if trip.departure_date:
                                        if trip.departure_date\
                                                != trip_data['departure_date']:
                                            trip_obj = UserTrip.objects.create(
                                                **user_trip_data)
                                            trip_obj.language_country.add(language_country_obj)

                else:
                    trip_obj = UserTrip.objects.create(**user_trip_data)
                    trip_obj.language_country.add(language_country_obj)
                if trip_obj:
                    user_profile.trip.add(trip_obj)

        serializer = UserProfileDetailSerializer(
            user_profile,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            # serializer.save()
            return Response(
                serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserTripUpdate(RetrieveUpdateDestroyAPIView):
    """
    Return a specific user_trip, update it, or delete it.
    """
    model = UserTrip
    serializer_class = UserTripSerializer
    queryset = UserTrip.objects.all()

    def put(self, request, *args, **kwargs):
        user_trip = UserTrip.objects.get(id=int(request.data.get('id', None)))
        xp = int(request.data.get('xp', None))
        data = {
            'id': user_trip.id,
            'xp': user_trip.xp + xp
        }

        serializer = UserTripSerializer(user_trip, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MultipleFieldLookupMixin(object):
    def get_object(self):
        queryset = self.get_queryset()             # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        filter = {}
        for field in self.lookup_fields:
            filter[field] = self.kwargs[field]
        return get_object_or_404(queryset, **filter)  # Lookup the object


class UserTrackView(MultipleFieldLookupMixin, RetrieveUpdateDestroyAPIView):
    serializer_class = UserTrackSerializer
    queryset = UserTrack.objects.all()
    lookup_fields = ('user__id', 'trip__id')

    def put(self, request, *args, **kwargs):
        user_track = self.get_object()
        user_track.status = request.data.get('status', None)
        user_track.save()
        serializer = UserTrackSerializer(
            user_track,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            # serializer.save()
            return Response(
                serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST)
