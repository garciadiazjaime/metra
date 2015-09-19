import json

from django.shortcuts import render, HttpResponse

from .models import Line, Station, Ride
from .tasks import task_request_schedule


def index(request):
	data = Line.objects.get_stations_from_metra()
	# TODO: uncommnet when logic to no overwrite is implemented or when need to populate stations again
	# result = Station.objects.save_stations_from_metra(data)
	return HttpResponse(json.dumps(data), content_type="application/json")

def request_schedule(request):
	date = '09/14/2015'
	for line in Line.objects.all():
		stations = Station.objects.filter(line=line)
		for i in range(0, stations.count() -1 ):
			for j in range(i+1, stations.count()):
				task_request_schedule.delay(line, stations[i], stations[j], date)
				break
			break
		break
	return HttpResponse('job started...<br />check logs')
