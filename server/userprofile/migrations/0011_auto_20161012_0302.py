# -*- coding: utf-8 -*-
# Generated by Django 1.9.9 on 2016-10-12 03:02
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0010_languagecountry_country'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='language',
            name='code',
        ),
        migrations.AlterField(
            model_name='languagecountry',
            name='country',
            field=models.CharField(blank=True, default=datetime.datetime(2016, 10, 12, 3, 2, 0, 545189, tzinfo=utc), max_length=60, unique=True),
            preserve_default=False,
        ),
    ]
