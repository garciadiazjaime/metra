from rest_framework import serializers

from ..models import Line, Station, Ride

# Serializers define the API representation.
class LineSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Line
    fields = ('id', 'name', 'code', 'link')

class StationSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Station
		fields = ('id', 'code', 'name', 'latitud', 'longitude', 'zone', 'url', 'line')

class RideSerializer(serializers.ModelSerializer):

	class Meta:
		model = Ride
		fields = ('id', 'line', 'station_from', 'station_to', 'time_start', 'time_end', 'trip', 'train_num', 'day', 'allow_bikes')