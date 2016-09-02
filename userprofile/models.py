from django.db import models
from model_utils.models import TimeStampedModel

from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _

# Create your models here.


class UserProfile(TimeStampedModel):
    """
    Model to create user profile.

    :user: User, profile has one to one relation with user model.

    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile",
        verbose_name=_("user"))
    profile_picture = models.ImageField(
        upload_to='profiles',
        # validators=[validate_file_extension],
        help_text='Maximum file size allowed is 2Mb'
    )
