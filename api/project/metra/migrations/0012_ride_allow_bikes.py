# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('metra', '0011_ride_day'),
    ]

    operations = [
        migrations.AddField(
            model_name='ride',
            name='allow_bikes',
            field=models.BooleanField(default=False),
        ),
    ]
