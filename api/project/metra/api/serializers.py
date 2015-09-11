from rest_framework import serializers

from ..models import Line

# Serializers define the API representation.
class LineSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
      model = Line
      fields = ('name', 'code', 'link')