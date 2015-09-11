# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('metra', '0002_auto_20150722_0339'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stop',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('code', models.CharField(max_length=120)),
                ('name', models.CharField(max_length=120)),
                ('latitud', models.CharField(max_length=120)),
                ('longitude', models.CharField(max_length=120)),
                ('url', models.URLField(default=b'http://metrarail.com/', max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Zone',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=150)),
            ],
        ),
        migrations.AddField(
            model_name='stop',
            name='zone',
            field=models.ForeignKey(to='metra.Zone'),
        ),
    ]
