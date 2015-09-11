from rest_framework import viewsets

from ..models import Line
from .serializers import LineSerializer

# ViewSets define the view behavior.
class LineViewSet(viewsets.ModelViewSet):
  queryset = Line.objects.all()
  serializer_class = LineSerializer