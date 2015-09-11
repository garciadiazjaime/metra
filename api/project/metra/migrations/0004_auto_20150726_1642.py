# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('metra', '0003_auto_20150724_2038'),
    ]

    operations = [
        migrations.RenameField(
            model_name='line',
            old_name='link',
            new_name='source',
        ),
    ]
