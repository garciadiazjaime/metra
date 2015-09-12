from rest_framework import serializers

from ..models import Line, Station

# Serializers define the API representation.
class LineSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Line
    fields = ('id', 'name', 'code', 'link')

class StationSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Station
		fields = ('id', 'code', 'name', 'latitud', 'longitude', 'zone', 'url', 'line')