# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('metra', '0007_delete_metraapisettings'),
    ]

    operations = [
        migrations.AddField(
            model_name='station',
            name='line',
            field=models.ForeignKey(default=0, to='metra.Line'),
        ),
        migrations.AlterField(
            model_name='station',
            name='zone',
            field=models.ForeignKey(blank=True, to='metra.Zone', null=True),
        ),
    ]
