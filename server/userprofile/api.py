from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView,)
from datetime import datetime, timedelta
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status, views
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
    User, UserTrip,
    Trip, LanguageCountry, UserTrack)
from content.models import Asset

user_Auth_Tokens = [
        "FF69FDA8",
        "A7F761B4",
        "221845A2",
        "61EF2481",
        "BEC2C044",
        "AAC5CCC5",
        "2257147D",
        "88060766",
        "185C7FBA",
        "9C62BFFB",
        "FEA69AE7",
        "7672EDB0",
        "151CD1DB",
        "25E8DDCF",
        "ADA8BA1B",
        "C38CD5ED",
        "FA72D58E",
        "D47191A8",
        "04C97BBD",
        "8B332040",
        "68147207",
        "AEA5A1A4",
        "24355ED4",
        "66A01B85",
        "D603F701",
        "649975CD",
        "3FFA1D6A",
        "10FA7F0B",
        "13C2789D",
        "96CABDC5",
        "34912A00",
        "5A7BF073",
        "DE856FDD",
        "CF782498",
        "7F4D1451",
        "4D7A2F30",
        "E9BD7472",
        "4E4DF056",
        "9B086AC7",
        "4F0FDAEB",
        "AAD7A1F0",
        "CF79FFBB",
        "ADAA5362",
        "6C08E4CA",
        "21B6A88E",
        "48D0C87D",
        "83BC3216",
        "96F1703B",
        "D6200F71",
        "15ED5AD2",
        "6901E869",
        "B9FAAAB1",
        "2BAEBA9A",
        "7AC2AF48",
        "1EFEB088",
        "DE260AFA",
        "358461A6",
        "00AF551F",
        "41903217",
        "9CA9BE8A",
        "956AD722",
        "FD11608C",
        "CCA89F36",
        "AD80A2F2",
        "BFF70433",
        "80D99897",
        "1291AFDF",
        "E5DF117A",
        "32392FDF",
        "80A00C5B",
        "D9798B3E",
        "20A3B681",
        "DA089635",
        "74D7E874",
        "E52AC1EB",
        "C1ED8511",
        "03AEA573",
        "8A12420C",
        "8A0858D7",
        "E4569F57",
        "D7F513EC",
        "E10E9BD9",
        "CE0240C1",
        "9D16690D",
        "D2FFE6C5",
        "522F03B0",
        "0B61E74E",
        "2A77E5A0",
        "CB464639",
        "1FA0C227",
        "5A74FBA5",
        "3659A9A8"
]


class CheckAuthToken(views.APIView):

    def get(self, request, *args, **kwargs):
        global user_Auth_Tokens
        status1 = {}
        status1['exist'] = False
        token = request.GET.get('token', None)
        if token:
            while token in user_Auth_Tokens:
                user_Auth_Tokens.remove(token)
                status1['exist'] = True
        return Response(status1, status=status.HTTP_200_OK)


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
            departure_date = trip_data.get('departure_date', None)
            region = trip_data.get('region', None)
            trip_type = trip_data.get('trip_type', None)
            journey_obj = Trip.objects.get(
                name=trip_data['trip']['name'])
            language_country_obj = LanguageCountry.objects.filter(
                language__name=trip_data['language_country'][0]['language'],
                country=trip_data['language_country'][0]['country']
            )
            # user_trip.language_country.add(*language_country)
            trip_id = trip_data.get('id', None)
            if language_country_obj:
                language_country_obj = language_country_obj[0]

                if trip_id:
                    existing_trip = UserTrip.objects.get(
                        id=trip_id)
                    existing_trip.trip = journey_obj
                    existing_trip.departure_date = departure_date
                    existing_trip.region = region
                    existing_trip.trip_type = trip_type
                    existing_trip.save()
                    existing_trip.language_country.clear()
                    existing_trip.language_country.add(
                        language_country_obj)
                else:

                    trip_qs = UserTrip.objects.filter(
                        userprofile__id=user_profile.id,
                        # trip=journey_obj,
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
                        pass
                        # trip = trip_qs.first()
                        # if trip.trip_type:
                        #     if trip.trip_type != trip_data['trip_type']:
                        #         trip_obj = UserTrip.objects.create(**user_trip_data)
                        #         trip_obj.language_country.add(language_country_obj)
                        #     else:
                        #         if trip.region:
                        #             if trip.region != trip_data['region']:
                        #                 trip_obj = UserTrip.objects.create(
                        #                     **user_trip_data)
                        #                 trip_obj.language_country.add(language_country_obj)
                        #             else:
                        #                 if trip.departure_date:
                        #                     if trip.departure_date\
                        #                             != trip_data['departure_date']:
                        #                         trip_obj = UserTrip.objects.create(
                        #                             **user_trip_data)
                        #                         trip_obj.language_country.add(language_country_obj)

                    else:
                        trip_obj = UserTrip.objects.create(**user_trip_data)
                        trip_obj.language_country.add(language_country_obj)
                    if trip_obj:
                        user_profile.trip.add(trip_obj)
                        user_track = UserTrack()
                        user_track.user = user_profile
                        user_track.trip = trip_obj
                        user_track.save()

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
        xp_possible = int(request.data.get('xp_possible', 0))
        d = user_trip.xp_daily
        key = datetime.now().strftime("%Y-%m-%d")
        # key2 = datetime.now() + timedelta(days=1)
        # key2 = key2.strftime("%Y-%m-%d")
        # d['ip'] = ip_address
        data = {}
        if d:
            if key in d:
                d[key] += xp
            else:
                d[key] = xp
        else:
            d = {}
            d[key] = xp
            # user_trip.xp_daily = data
        user_trip.xp_daily = d
        user_trip.save()
        data = {
            'id': user_trip.id,
            'xp': user_trip.xp + xp,
            'xp_possible': xp_possible
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
        obj = get_object_or_404(queryset, **filter)  # Lookup the object
        return obj


class UserTrackView(MultipleFieldLookupMixin, RetrieveUpdateDestroyAPIView):
    serializer_class = UserTrackSerializer
    queryset = UserTrack.objects.all()
    lookup_fields = ('user__id', 'trip__id')

    def get_object(self, queryset=None):
        queryset = self.get_queryset()             # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        filter = {}
        for field in self.lookup_fields:
            filter[field] = self.kwargs[field]
        try:
            obj = UserTrack.objects.get(**filter)
        except:
            try:
                obj = UserTrack()
                user = User.objects.get(id=filter['user__id'])
                user_trip = UserTrip.objects.get(id=filter['trip__id'])
                obj.user = user
                obj.trip = user_trip
                obj.save()
            except:
                raise Http404("Object Not Found")
        # obj = get_object_or_404(queryset, **filter)  # Lookup the object
        return obj

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
