import uuid
from django.db import models

# Create your models here.


class Category(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)


class Lesson(models.Model):
    category = models.ForeignKey(
        Category,
        null=True, blank=True, related_name='lesson',
    )
    name = models.CharField(max_length=200)
