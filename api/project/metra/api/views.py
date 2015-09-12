from rest_framework import viewsets

from ..models import Line, Station
from .serializers import LineSerializer, StationSerializer

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