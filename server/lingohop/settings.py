"""
Django settings for lingohop project.

Generated by 'django-admin startproject' using Django 1.9.9.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import environ
import os
import mongoengine as mongo


ROOT_DIR = environ.Path(__file__) - 2  # (/a/b/myfile.py - 3 = /)
APPS_DIR = ROOT_DIR.path('lingohop')
# print(ROOT_DIR)
env_path = str(ROOT_DIR.path('.env'))
# env_path = str(APPS_DIR.path('.env'))
env = environ.Env()
environ.Env.read_env(env_path)

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'i8#r3z*dhrhflongxgv-%#uilx_!b_2i@9ob9n4hs)c#0j=b-9'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

DJANGO_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sites',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

)

THIRD_PARTY_APPS = (
    'allauth',  # registration
    'allauth.account',  # registration
    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',
    'django_countries',
    # 'reversion',
)

LOCAL_APPS = (
    'userprofile',  # user profile  Modules
    'content',  # user profile  Modules
)

# See: https://docs.djangoproject.com/en/dev/ref/settings/#installed-apps
INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

SITE_ID = 1
REST_SESSION_LOGIN = False
ACCOUNT_LOGOUT_ON_GET = True

AUTH_USER_MODEL = 'userprofile.User'

MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'lingohop.urls'


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'lingohop/templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'lingohop.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
    # Raises ImproperlyConfigured exception if DATABASE_URL not in os.environ
    'default': env.db("DATABASE_URL", default="postgres:///lingohop"),
}

# _MONGODB_USER = ''
# _MONGODB_PASSWD = ''
# _MONGODB_HOST = 'localhost'
# _MONGODB_HOST = '52.67.163.70'
# _MONGODB_NAME = 'lingohop1'
# _MONGODB_DATABASE_HOST = \
#     'mongodb://%s:%s@%s/%s' \
#     % (_MONGODB_USER, _MONGODB_PASSWD, _MONGODB_HOST, _MONGODB_NAME)
mongo.connect(env('_MONGODB_NAME'), host=env('_MONGODB_HOST'))
# print ('urls', env.db('_MONGODB_HOST'), env.db('_MONGODB_NAME'))
# mongo.connect(
#     _MONGODB_NAME, host=_MONGODB_HOST, port=27017, alias='default')

DATABASES['default']['ATOMIC_REQUESTS'] = True

# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

# AUTH_PASSWORD_VALIDATORS = [
#     {
#         'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
#     },
# ]


# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# STATIC_ROOT = str(ROOT_DIR('staticfiles'))
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

STATIC_URL = '/static/'

# print ('apss ir', str(BASE_DIR.path('lingohop/static')))

STATICFILES_DIRS = (
    str(ROOT_DIR.path('lingohop/static')),
)

# See: https://docs.djangoproject.com/en/dev/ref/settings/#media-root
MEDIA_ROOT = str(APPS_DIR('media'))


# See: https://docs.djangoproject.com/en/dev/ref/settings/#media-url
MEDIA_URL = '/media/'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    )
}

try:
    from local_settings import *
except ImportError:
    pass