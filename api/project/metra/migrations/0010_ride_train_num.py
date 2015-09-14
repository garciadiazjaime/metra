# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('metra', '0009_ride'),
    ]

    operations = [
        migrations.AddField(
            model_name='ride',
            name='train_num',
            field=models.CharField(max_length=140, null=True, blank=True),
        ),
    ]
