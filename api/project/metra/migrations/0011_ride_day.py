# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('metra', '0010_ride_train_num'),
    ]

    operations = [
        migrations.AddField(
            model_name='ride',
            name='day',
            field=models.IntegerField(null=True, blank=True),
        ),
    ]
