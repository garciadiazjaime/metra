import json

from django.shortcuts import render, HttpResponse

from .models import Line, Station

def index(request):
	data = Line.objects.get_stations_from_metra()
	result = Station.objects.save_stations_from_metra(data)
	print result
	return HttpResponse(json.dumps(data), content_type="application/json")
