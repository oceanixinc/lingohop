# -*- coding: utf-8 -*-
# Generated by Django 1.9.9 on 2016-10-12 02:44
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0008_auto_20160924_1604'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='languagecountry',
            name='country',
        ),
    ]
