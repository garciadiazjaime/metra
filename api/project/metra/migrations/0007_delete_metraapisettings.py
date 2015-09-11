# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('metra', '0006_auto_20150726_1651'),
    ]

    operations = [
        migrations.DeleteModel(
            name='MetraAPISettings',
        ),
    ]
