# -*- coding: utf-8 -*-
# Generated by Django 1.9.9 on 2016-09-24 16:04
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0007_auto_20160924_1557'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={'permissions': (('create_new_user', 'Can create new user'),), 'verbose_name': 'User Information', 'verbose_name_plural': 'Users Information'},
        ),
    ]
