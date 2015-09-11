from django.db import models
from .managers import LineManager, StationManager


class Line(models.Model):
	name = models.CharField(max_length=140)
	code = models.CharField(max_length=140)
	link = models.URLField(max_length=500, default='http://metrarail.com/')

	objects = LineManager()

	def __unicode__(self):
		return "%s" % self.name

class Zone(models.Model):
	name = models.CharField(max_length=150)

	def __unicode__(self):
		return "%s" % self.name

class Station(models.Model):
	code = models.CharField(max_length=120)
	name = models.CharField(max_length=120)
	latitud = models.CharField(max_length=120)
	longitude = models.CharField(max_length=120)
	zone = models.ForeignKey(Zone, null=True, blank=True)
	url = models.URLField(max_length=500, default='http://metrarail.com/')
	line = models.ForeignKey(Line, default=0)

	objects = StationManager()

	def __unicode__(self):
		return "%s" % self.code