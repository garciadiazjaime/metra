# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('metra', '0005_line_link'),
    ]

    operations = [
        migrations.CreateModel(
            name='MetraAPISettings',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('stops_endpoint', models.URLField(default=b'http://metrarail.com/content/metra/en/home/jcr:content/trainTracker.get_stations_from_line.json?trackerNumber=0&trainLineId=[LINE_CODE]', max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Station',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('code', models.CharField(max_length=120)),
                ('name', models.CharField(max_length=120)),
                ('latitud', models.CharField(max_length=120)),
                ('longitude', models.CharField(max_length=120)),
                ('url', models.URLField(default=b'http://metrarail.com/', max_length=500)),
                ('zone', models.ForeignKey(to='metra.Zone')),
            ],
        ),
        migrations.RemoveField(
            model_name='stop',
            name='zone',
        ),
        migrations.RenameField(
            model_name='line',
            old_name='short_name',
            new_name='code',
        ),
        migrations.RemoveField(
            model_name='line',
            name='source',
        ),
        migrations.DeleteModel(
            name='Stop',
        ),
    ]
