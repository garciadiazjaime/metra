# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('metra', '0004_auto_20150726_1642'),
    ]

    operations = [
        migrations.AddField(
            model_name='line',
            name='link',
            field=models.URLField(default=b'http://metrarail.com/', max_length=500),
        ),
    ]
