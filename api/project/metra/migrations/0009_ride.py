# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('metra', '0008_auto_20150727_0109'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ride',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time_start', models.TimeField()),
                ('time_end', models.TimeField()),
                ('trip', models.CharField(max_length=140)),
                ('line', models.ForeignKey(to='metra.Line')),
                ('station_from', models.ForeignKey(related_name='station_from', to='metra.Station')),
                ('station_to', models.ForeignKey(related_name='station_to', to='metra.Station')),
            ],
        ),
    ]
