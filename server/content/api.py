from functools import reduce
import operator
from rest_framework.response import Response
from rest_framework import status, views
from rest_framework_mongoengine import generics
from .serializers import (
    AssetSerializer,
    ContentSerializer,
    RegionSerializer,
    WordSerializer,
    CategorySerializer, JourneySerializer, TrackSerializer)
from mongoengine import fields

from django.shortcuts import get_object_or_404
from django.http import Http404

from .models import *
# from rest_framework.parsers import FileUploadParser
import base64
import uuid


import json
from bson import ObjectId


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


def get_obj_or_404(klass, *args, **kwargs):
    try:
        return klass.objects.get(*args, **kwargs)
    except klass.DoesNotExist:
        raise Http404


class MultipleFieldLookupContentMixin(object):
    """
    Apply this mixin to any view or viewset to get multiple field filtering
    based on a `lookup_fields` attribute, instead of the default single field filtering.
    """

    def get_object(self):
        queryset = self.get_queryset()             # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        filter = {}
        for field in self.lookup_fields:
            if self.kwargs[field]:  # Ignore empty fields.
                filter[field] = self.kwargs[field]
        return get_obj_or_404(Content, **filter)  # Lookup the object


def list_field_to_dict(list_field):

    return_data = []

    for item in list_field:
        if isinstance(item, EmbeddedDocument):
            return_data.append(mongo_to_dict(item, []))
        else:
            return_data.append(mongo_to_python_type(item, item))

    return return_data


def mongo_to_python_type(field, data):

    if isinstance(field, fields.DateTimeField):
        return str(data.isoformat())
    # elif isinstance(field, ComplexDateTimeField):
    #     return field.to_python(data).isoformat()
    elif isinstance(field, fields.StringField):
        return str(data)
    elif isinstance(field, fields.FloatField):
        return float(data)
    elif isinstance(field, fields.IntField):
        return int(data)
    elif isinstance(field, fields.BooleanField):
        return bool(data)
    elif isinstance(field, fields.ObjectIdField):
        return str(data)
    elif isinstance(field, fields.DecimalField):
        return data
    else:
        return str(data)


def mongo_to_dict(obj, exclude_fields):
    return_data = []

    if obj is None:
        return None

    if isinstance(obj, Document):
        return_data.append(("id", str(obj.id)))

    for field_name in obj._fields:

        if field_name in exclude_fields:
            continue

        if field_name in ("id",):
            continue

        data = obj._data[field_name]

        if isinstance(obj._fields[field_name], fields.ListField):
            return_data.append((field_name, list_field_to_dict(data)))
        elif isinstance(obj._fields[field_name], fields.EmbeddedDocumentField):
            return_data.append((field_name, mongo_to_dict(data, [])))
        elif isinstance(obj._fields[field_name], fields.DictField):
            return_data.append((field_name, data))
        else:
            return_data.append(
                (
                    field_name,
                    mongo_to_python_type(obj._fields[field_name], data)
                )
            )

    return dict(return_data)





class ContentCreate(MultipleFieldLookupContentMixin, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ContentSerializer
    queryset = Content.objects.all()

    lookup_fields = ('country', 'language')
    current_object = None

    def get_audio_files(self, data):

        content = self.current_object
        asset = Asset.objects.get(
            country=content.country,
            language=content.language)
        asset_words = asset.words
        new_dict = {item['word']: item for item in asset_words}
        try:
            data.remove('[]')
        except:
            pass
        required_words = []
        for each in data:
            try:
                required_words.append(new_dict[each])
            except:
                pass

        outer = {}
        for each_word in required_words:
            gender = {}
            audio_files = each_word.audio.files
            for each_audio in audio_files:
                file_list = each_audio.files
                region = {}
                for each_file in file_list:
                    region[each_file.region] = each_file.file

                gender[each_audio.gender] = region

            outer[each_word.word] = gender

        return outer

    def get_question_object(self, data, *args, **kwargs):
        default = kwargs.get('default', False)
        question = Question()
        question.question_text = data['question_text']
        question.answer_text = data['answer_text']
        question.variables = data['variables']
        question.rules = data['rules']
        question.images = data['images']
        question.audio = self.get_audio_files(
            data['question_text'] + data['answer_text'])

        # return question
        if default:
            return mongo_to_dict(question, [])
        else:
            return question

    def get_part_object(self, data, *args, **kwargs):
        default = kwargs.get('default', False)
        part1 = False
        part2 = False
        # try:
        #     question_data = data['part1']
        #     print ('question_data is', question_data)
        #     part1 = True
        # except:
        #     pass
        # try:
        #     question_data = data['part2']
        #     print ('question_data is', question_data)
        #     part2 = True
        # except:
        #     pass
        question_data = data['part1']
        if question_data is None or len(question_data) == 0:
            question_data = data['part2']
            part2 = True
        else:
            part1 = True
        question = self.get_question_object(question_data, default=False)

        part = Part()

        if part1:
            part.part1 = question
        else:
            part.part2 = question

        if isinstance(part, dict):
            return part
        if default:
            return mongo_to_dict(part, [])
        else:
            return part

    def get_lesson_object(self, data, *args, **kwargs):
        default = kwargs.get('default', False)
        lesson_data = data[0]
        part = self.get_part_object(lesson_data['parts'], default=False)
        lesson = Lesson()
        lesson.name = lesson_data['name']
        lesson.parts = part
        if isinstance(lesson, dict):
            return lesson
        if default:
            return mongo_to_dict(lesson, [])
        else:
            return lesson

    def get_category_object(self, data, *args, **kwargs):
        default = kwargs.get('default', False)
        category = data[0]
        lesson = self.get_lesson_object(category['lessons'], default=False)
        category1 = Category()
        category1.category_name = category['category_name']
        category1.lessons.append(lesson)

        if default:
            return mongo_to_dict(category1, [])
        else:
            return category1

    def put(self, request, *args, **kwargs):
        country = request.data.get('country', None)
        language = request.data.get('language', None)
        categories = request.data.get('categories', None)

        content = Content.objects.get(
            country=country,
            language=language)
        self.current_object = content

        # obj_categories = content.get_categories()

        journeys = request.data.get('journeys')
        journey_names = list(journeys.keys())
        obj_journeys = content.get_journeys()
        journey_input = journey_names[0]
        region_names = list(journeys[journey_input].keys())
        region_input = region_names[0]
        track_names = list(journeys[journey_input][region_input].keys())
        track_input = track_names[0]
        categories = journeys[journey_input][region_input][track_input]
        if journey_input in obj_journeys:
            obj_regions = content.get_regions(journey_names[0])
            region_names = list(journeys[journey_input].keys())
            region_input = region_names[0]
            if region_names[0] in obj_regions:
                obj_tracks = content.get_tracks(journey_input, region_input)
                track_names = list(journeys[journey_input][region_input].keys())
                track_input = track_names[0]
                if track_input in obj_tracks:
                    # categories = journeys[journey_input][region_input][track_input]
                    obj_categories = content.get_categories(
                        journey_input, region_input, track_input)
                    category_input = categories[0]
                    category_name = category_input['category_name']
                    lessons = category_input['lessons']
                    if category_name in obj_categories:
                        index1 = obj_categories.index(category_name)
                        obj_lessons = content.get_lessons(
                            journey_input, region_input,
                            track_input, category_name
                        )
                        lesson_name = lessons[0]['name']
                        if lesson_name in obj_lessons:
                            index3 = obj_lessons.index(lesson_name)
                            parts = lessons[0]['parts']
                            obj_parts = self.get_part_object(parts, default=True)
                            if bool(obj_parts['part1']):
                                content.journeys[journey_input][region_input][track_input][index1]["lessons"][index3]["parts"]["part1"]= obj_parts['part1']
                                # content.journeys[index1].lessons[index3].parts.part1 = obj_parts.part1
                                content.save()
                            if bool(obj_parts['part2']):
                                content.journeys[journey_input][region_input][track_input][index1]["lessons"][index3]["parts"]["part2"] = obj_parts['part2']
                                # content.categories[index1].lessons[index3].parts.part2 = obj_parts.part2
                                content.save()
                        else:
                            new_lesson = self.get_lesson_object(
                                lessons, default=True)
                            lesson_objects = content.get_active_lessons(
                                journey_input, region_input,
                                track_input,
                                category_name)
                            index2 = len(lesson_objects)
                            # lesson_objects[index2].is_active = False
                            content.journeys[journey_input][region_input][track_input][index1]["lessons"].append(new_lesson)
                            # content.categories[index1].lessons.append(new_lesson)
                            content.save()

                    else:
                        new_category = self.get_category_object(categories, default=True)
                        content.journeys[journey_input][region_input][track_input].append(new_category)
                        content.save()

                else:
                    # categories = journeys[journey_input][region_input][track_input]
                    # obj_categories = content.get_categories(
                    #     journey_input, region_input, track_input)
                    # category_input = categories[0]
                    # for each_category in categories:
                    # category_name = category_input['category_name']
                    # lessons = category_input['lessons']
                    new_category = self.get_category_object(categories, default=True)
                    new_track = {}
                    new_track[track_input] = [new_category]
                    content.journeys[journey_input][region_input].update(new_track)
                    content.save()

            else:
                new_category = self.get_category_object(categories, default=True)
                new_region = {}
                new_region[region_input] = journeys[journey_input][region_input]
                content.journeys[journey_input].update(new_region)
                content.save()
        else:
            new_category = self.get_category_object(categories, default=True)
            new_track = {}
            new_track[track_input] = [new_category]
            new_region = {}
            new_region[region_input] = new_track
            new_journey = {}
            new_journey[journey_input] = new_region
            # new_journey[journey_names[0]] = journeys[journey_names[0]]
            # content.journeys.update(new_journey)
            content.journeys.update(new_journey)
            content.save()


            # content.update(
            #     set__journeys__'+'journey_names[0]=journeys[journey_names[0]])

        # for each_category in categories:
        #     category_name = each_category['name']
        #     lessons = each_category['lessons']
        #     if category_name in obj_categories:
        #         index1 = obj_categories.index(category_name)
        #         obj_lessons = content.get_lessons(category_name)
        #         for each_lesson in lessons:
        #             lesson_name = each_lesson['name']
        #             if lesson_name in obj_lessons:
        #                 index3 = obj_lessons.index(lesson_name)
        #                 parts = each_lesson['parts']
        #                 empty_part = content.get_empty_part(
        #                     category_name, lesson_name)
        #                 obj_parts = self.get_part_object(parts)
        #                 if bool(obj_parts.part1):
        #                     content.categories[index1].lessons[index3].parts.part1 = obj_parts.part1
        #                     content.save()
        #                 if bool(obj_parts.part2):
        #                     content.categories[index1].lessons[index3].parts.part2 = obj_parts.part2
        #                     content.save()

        #             else:
        #                 new_lesson = self.get_lesson_object(
        #                     lessons)
        #                 lesson_objects = content.get_active_lessons(category_name)
        #                 index2 = len(lesson_objects) - 1
        #                 lesson_objects[index2].is_active = False
        #                 content.categories[index1].lessons.append(new_lesson)
        #                 content.save()
        #     else:
        #         new_category = self.get_category_object(categories)
        #         content.update(push__categories=new_category)

        serializer = ContentSerializer(
            content,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            # serializer.save()
            return Response(
                serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContentUpdate(generics.RetrieveUpdateDestroyAPIView):
    """Return a specific asset, update it, or delete it."""
    serializer_class = ContentSerializer
    queryset = Content.objects.all()

    lookup_field = 'name'


class MultipleFieldLookupMixin(object):
    """
    Apply this mixin to any view or viewset to get multiple field filtering
    based on a `lookup_fields` attribute, instead of the default single field filtering.
    """

    def get_object(self):
        queryset = self.get_queryset()             # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        filter = {}
        for field in self.lookup_fields:
            if self.kwargs[field]:  # Ignore empty fields.
                filter[field] = self.kwargs[field]
        return get_obj_or_404(Asset, **filter)  # Lookup the object


class ContentRetrieveApi(views.APIView):

    def get(self, request, format=None):
        country = self.request.GET.get('country', None)
        language = self.request.GET.get('language', None)
        try:
            content = Content.objects.get(
                country=country,
                language=language)
        except:
            return Response(
                {'detail': 'country-language not available'},
                status=status.HTTP_200_OK)
        journey_data = self.request.GET.get('journey', None)
        region_data = self.request.GET.get('region', None)
        track_data = self.request.GET.get('track', None)
        if journey_data and region_data and track_data:
            return Response(
                content.journeys[journey_data][region_data][track_data],
                status=status.HTTP_200_OK)
        if journey_data and region_data:
            return Response(
                content.journeys[journey_data][region_data],
                status=status.HTTP_200_OK)
        if journey_data:
            return Response(
                content.journeys[journey_data],
                status=status.HTTP_200_OK)
        else:
            serializer = ContentSerializer(content)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK)


class AssetCreate(MultipleFieldLookupMixin, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AssetSerializer
    queryset = Asset.objects.all()

    lookup_fields = ('country', 'language')
    # parser_classes = (FileUploadParser,)

    def get_audio_image(self, data):
        word = data['word']
        images = data['images']
        audio = data['audio']['files']
        image_list = []
        for each_image in images:
            file = each_image['file']
            image = Image()
            image.file = file
            image_list.append(image)
        audio_file_list = []
        for index, each_row in enumerate(audio):
            gender = each_row['gender']
            audio_file = AudioFile()
            audio_file.gender = gender
            region_files = each_row['files']
            for region_index, each_region in enumerate(region_files):
                region = each_region['region']
                region_file = each_region['file']
                audio_files = Files()
                audio_files.region = region
                audio_files.file = region_file
                audio_file.files.append(audio_files)
            audio_file_list.append(audio_file)

        audio1 = Audio()
        audio1.files = audio_file_list
        audio_image = AudioImage()
        audio_image.word = word
        audio_image.images = image_list
        audio_image.audio = audio1

        return audio_image

    def put(self, request, *args, **kwargs):
        country = request.data.get('country', None)
        language = request.data.get('language', None)
        words = request.data.get('words', None)
        if country is not None and language is not None and words is not None:
            # for lan_index, each_data in enumerate(data):
            #     a = list(each_data.keys())[0]
            #     words = data[lan_index][a]
            for word_index, each_word in enumerate(words):
                try:
                    b = each_word['word']
                    c = each_word['images']
                    d = each_word['audio']['files']
                except:
                    return Response(
                        {'detail': 'data invalid'},
                        status=status.HTTP_400_BAD_REQUEST)

                for index, each in enumerate(c):
                    img = each['file']
                    if len(img) > 0:
                        if 'base64' in img:
                            my_image = img.split(';base64,')
                            img_ext = my_image[0].split('/')
                            imgdata = base64.b64decode(my_image[1])
                            file_name = str(uuid.uuid4())
                            fname = '../media/images/%s.%s' % (file_name, img_ext[1])

                            # file_name = str(uuid.uuid4())
                            # fname = '../media/profiles/%s.%s' % (file_name, 'png')

                            real_file = fname.split('../')
                            # d64i = bytes(img, 'utf-8')
                            # d64i = bytes(imgdata, 'utf-8')
                            with open(fname, "wb") as fh:
                                # fh.write(base64.decodestring(d64i))
                                fh.write(imgdata)
                                # fh.write(d64i)
                            # fh.write(img.decode('base64'))
                            request.data['words'][word_index]['images'][index]['file'] = "/" + real_file[1]
                        else:
                            return Response(
                                {'detail': 'binary image not provided'},
                                status=status.HTTP_400_BAD_REQUEST)

                for index, each_row in enumerate(d):
                    gender = each_row['gender']
                    region_files = each_row['files']
                    for region_index, each_region in enumerate(region_files):
                        region = each_region['region']
                        region_file = each_region['file']
                        if len(region_file) > 0:
                            if "audio/mpeg" in region_file:
                                if 'base64' in region_file:
                                    my_audio = region_file.split('base64,')
                                    img_ext = my_audio[0].split('/')
                                    imgdata = base64.b64decode(my_audio[1])
                                    file_name = gender + '_ ' + region + '_' + b
                                    fname = '../media/audios/%s.%s' % (file_name, 'mp3')

                                    real_file = fname.split('../')
                                    # d64i = bytes(img, 'utf-8')
                                    # d64i = bytes(imgdata, 'utf-8')
                                    with open(fname, "wb") as fh:
                                        # fh.write(base64.decodestring(d64i))
                                        fh.write(imgdata)
                                    request.data['words'][word_index]['audio']['files'][index]['files'][region_index]['file'] = "/" + real_file[1]
                            else:
                                return Response(
                                    {'detail': 'audio file is invalid'},
                                    status=status.HTTP_400_BAD_REQUEST)

                asset = Asset.objects.filter(
                    country=country,
                    language=language)
                # if asset:
                obj_words = asset[0].get_words()
                audio_image = self.get_audio_image(
                    request.data['words'][0])
                if b in obj_words:
                    asset[0].update(pull__words__word=b)
                asset[0].update(push__words=audio_image)

                serializer = AssetSerializer(
                    asset[0],
                    data=request.data,
                    partial=True
                )
                is_valid = serializer.is_valid()
                image_error = ''
                file_error = ''
                if not is_valid:
                    try:
                        image_error = serializer.errors['words']['images']['file'][0]
                    except:
                        pass
                    try:
                        file_error = serializer.errors['words']['audio']['files']['files']['file'][0]
                    except:
                        pass
                    if file_error == 'This field may not be blank.' or image_error == 'This field may not be blank.':
                        is_valid = True

                if is_valid:
                    # serializer.save()
                    return Response(
                        serializer.data, status=status.HTTP_201_CREATED)
                return Response(
                    serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {'detail': 'country or languages data not provided'},
            status=status.HTTP_400_BAD_REQUEST)


class AssetUpdate(generics.RetrieveUpdateDestroyAPIView):
    """Return a specific asset, update it, or delete it."""
    serializer_class = AssetSerializer
    queryset = Asset.objects.all()

    lookup_field = 'country'

    # def put(self, request, *args, **kwargs):
    #     print ('put request')


class RegionCreate(generics.ListCreateAPIView):
    serializer_class = RegionSerializer
    queryset = Region.objects.all()


class RegionUpdate(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RegionSerializer
    queryset = Region.objects.all()

    lookup_field = 'language_country'


class WordApi(generics.ListAPIView):
    serializer_class = WordSerializer
    # queryset = AudioImage.objects.all()

    def get_queryset(self):
        """
        This view should return a list of words.
        """
        q = self.request.GET.get('q', None)
        country = self.request.GET.get('country', None)
        language = self.request.GET.get('language', None)
        # assets = Asset.objects.filter(
        #     country='spain',
        #     words__match={"word": q})
        try:
            asset = Asset.objects.get(
                country=country,
                language=language)
            total_words = []
            # total_words = [word for word in asset.words if word.word.startswith(q)]
            if q:
                for each_word in asset.words:
                    if each_word.word.startswith(q):
                        total_words.append(each_word)

            return total_words
            # return a.words
        except Asset.DoesNotExist:
            return []


class CategoryApi(generics.ListCreateAPIView):
    """Category can be added, list"""
    serializer_class = CategorySerializer
    queryset = MainCategory.objects.all()


class JourneyApi(generics.ListCreateAPIView):
    serializer_class = JourneySerializer
    queryset = Journey.objects.all()


class TrackApi(generics.ListCreateAPIView):
    serializer_class = TrackSerializer
    queryset = Track.objects.all()