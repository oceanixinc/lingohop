from functools import reduce
import operator
from rest_framework.response import Response
from rest_framework import status
from rest_framework_mongoengine import generics
from .serializers import (
    AssetSerializer,
    ContentSerializer,
    RegionSerializer,
    WordSerializer,
    CategorySerializer)

from django.shortcuts import get_object_or_404
from django.http import Http404

from .models import *
# from rest_framework.parsers import FileUploadParser
import base64
import uuid


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

    def get_question_object(self, data):
        question = Question()
        question.question_text = data['question_text']
        question.answer_text = data['answer_text']
        question.variables = data['variables']
        question.rules = data['rules']
        question.images = data['images']
        question.audio = self.get_audio_files(data['question_text'])

        return question

    def get_part_object(self, data):
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

        if question_data is None:
            question_data = data['part2']
            part2 = True
        else:
            part1 = True
        question = self.get_question_object(question_data)

        part = Part()

        if part1:
            part.part1 = question
        else:
            part.part2 = question
        return part

    def get_lesson_object(self, data):
        lesson_data = data[0]
        part = self.get_part_object(lesson_data['parts'])
        lesson = Lesson()
        lesson.name = lesson_data['name']
        lesson.parts = part

        return lesson

    def get_category_object(self, data):
        category = data[0]
        lesson = self.get_lesson_object(category['lessons'])
        category1 = Category()
        category1.name = category['name']
        category1.lessons.append(lesson)

        return category1

    def put(self, request, *args, **kwargs):
        country = request.data.get('country', None)
        language = request.data.get('language', None)
        categories = request.data.get('categories', None)

        content = Content.objects.get(
            country=country,
            language=language)
        self.current_object = content

        obj_categories = content.get_categories()

        for each_category in categories:
            category_name = each_category['name']
            lessons = each_category['lessons']
            if category_name in obj_categories:
                index1 = obj_categories.index(category_name)
                obj_lessons = content.get_lessons(category_name)
                for each_lesson in lessons:
                    lesson_name = each_lesson['name']
                    if lesson_name in obj_lessons:
                        index3 = obj_lessons.index(lesson_name)
                        parts = each_lesson['parts']
                        empty_part = content.get_empty_part(
                            category_name, lesson_name)
                        # if empty_part is not None:
                        obj_parts = self.get_part_object(parts)
                        if bool(obj_parts.part1):
                            content.categories[index1].lessons[index3].parts.part1 = obj_parts.part1
                            content.save()
                        if bool(obj_parts.part2):
                            content.categories[index1].lessons[index3].parts.part2 = obj_parts.part2
                            content.save()

                    else:
                        new_lesson = self.get_lesson_object(
                            lessons)
                        lesson_objects = content.get_active_lessons(category_name)
                        index2 = len(lesson_objects) - 1
                        lesson_objects[index2].is_active = False
                        # category_objects = content.categories
                        # index1 = len(category_objects) - 1
                        content.categories[index1].lessons.append(new_lesson)
                        content.save()
                        # content.categories__lesson.append(new_lesson)
            else:
                new_category = self.get_category_object(categories)
                content.update(push__categories=new_category)

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

                if not is_valid:
                    file_error = serializer.errors['words']['audio']['files']['files']['file'][0]

                    if file_error == 'This field may not be blank.':
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


class CategoryList(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()