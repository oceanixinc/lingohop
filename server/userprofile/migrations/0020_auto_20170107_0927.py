# -*- coding: utf-8 -*-
# Generated by Django 1.9.9 on 2017-01-07 09:27
from __future__ import unicode_literals

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0019_usertrack'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usertrack',
            name='status',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, null=True),
        ),
    ]
