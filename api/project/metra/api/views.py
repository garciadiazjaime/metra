from rest_framework import viewsets

from ..models import Line, Station, Ride
from .serializers import LineSerializer, StationSerializer, RideSerializer

# ViewSets define the view behavior.
class LineViewSet(viewsets.ModelViewSet):
  queryset = Line.objects.all()
  serializer_class = LineSerializer

  def get_queryset(self):
    queryset = Line.objects.all()
    return queryset.order_by('id')

class StationViewSet(viewsets.ModelViewSet):
  queryset = Station.objects.none()
  serializer_class = StationSerializer

  def get_queryset(self):
    queryset = Station.objects.none()
    line = self.request.query_params.get('line', None)
    # if line parameter is present /line/ we filter by line
    if line is not None:
      queryset = Station.objects.filter(line=line)
    return queryset.order_by('id')

class RidesViewSet(viewsets.ModelViewSet):
  queryset = Ride.objects.none()
  serializer_class = RideSerializer

  def get_queryset(self):
    queryset = Ride.objects.none()
    # This view needs 4 params: /line/station_from/station_to/day
    line = self.request.query_params.get('line', None)
    station_from = self.request.query_params.get('station_from', None)
    station_to = self.request.query_params.get('station_to', None)
    day = self.request.query_params.get('day', None)
    # validate all 4 params are presented
    if line and station_from and station_to and day:
      line_obj = Line.objects.get(code=line)
      station_from_obj = Station.objects.filter(line=line_obj, code=station_from)[0]
      station_to_obj = Station.objects.filter(line=line_obj, code=station_to)[0]
      # in case we got valid param we query the db
      if line_obj and station_from_obj and station_to_obj:
        queryset = Ride.objects.filter(line=line_obj, station_from=station_from_obj, station_to=station_to_obj, day=int(day))
    return queryset.order_by('id')