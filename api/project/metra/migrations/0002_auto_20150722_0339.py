# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('metra', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='line',
            old_name='code',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='line',
            old_name='location',
            new_name='short_name',
        ),
        migrations.RemoveField(
            model_name='line',
            name='title',
        ),
        migrations.AddField(
            model_name='line',
            name='link',
            field=models.URLField(default=b'http://metrarail.com/', max_length=500),
        ),
    ]
