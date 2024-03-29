from .common import *

import environ
import os
from os.path import join, dirname


ROOT_DIR = environ.Path(__file__) - 2  # (/a/b/myfile.py - 3 = /)
BASE_DIR = dirname(dirname(__file__))


# SECRET CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
# Raises ImproperlyConfigured exception if DJANGO_SECRET_KEY not in os.environ
INSTALLED_APPS += ("gunicorn", )


# MEDIA_URL = 'https://s3.amazonaws.com/%s/' % AWS_STORAGE_BUCKET_NAME
MEDIA_URL = '/media/'
# Static Assets
# ------------------------

# STATICFILES_STORAGE = DEFAULT_FILE_STORAGE
# STATIC_URL = MEDIA_URL

STATIC_URL = '/static/'
