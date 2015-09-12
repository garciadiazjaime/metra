from rest_framework import viewsets

from ..models import Line, Station
from .serializers import LineSerializer, StationSerializer

# ViewSets define the view behavior.
class LineViewSet(viewsets.ModelViewSet):
  queryset = Line.objects.all()
  serializer_class = LineSerializer

class StationViewSet(viewsets.ModelViewSet):
	queryset = Station.objects.filter(line=1)
	serializer_class = StationSerializer