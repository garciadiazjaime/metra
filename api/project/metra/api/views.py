from rest_framework import viewsets

from ..models import Line, Station, Ride
from .serializers import LineSerializer, StationSerializer, RideSerializer

# ViewSets define the view behavior.
class LineViewSet(viewsets.ModelViewSet):
  queryset = Line.objects.all()
  serializer_class = LineSerializer

class StationViewSet(viewsets.ModelViewSet):
	queryset = Station.objects.all()
	serializer_class = StationSerializer

	def get_queryset(self):
		queryset = Station.objects.filter()
		line = self.request.query_params.get('line', None)
		if line is not None:
			queryset = queryset.filter(line=line)
		return queryset

class RidesViewSet(viewsets.ModelViewSet):
	queryset = Ride.objects.all()
	serializer_class = RideSerializer

	def get_queryset(self):
		queryset = Ride.objects.filter()
		line = self.request.query_params.get('line', None)
		station_from = self.request.query_params.get('station_from', None)
		station_to = self.request.query_params.get('station_to', None)
		day = self.request.query_params.get('day', None)
		if line and station_from and station_to and day:
			line_obj = Line.objects.get(code=line)
			station_from_obj = Station.objects.filter(code=station_from)[0]
			station_to_obj = Station.objects.filter(code=station_to)[0]
			if line_obj and station_from_obj and station_to_obj:
				queryset = queryset.filter(line=line_obj, station_from=station_from_obj, station_to=station_to_obj, day=int(day))
		return queryset