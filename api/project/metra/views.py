import json

from django.shortcuts import render, HttpResponse

from .models import Line, Station


def index(request):
	data = Line.objects.get_stations_from_metra()
	# TODO: uncommnet when logic to no overwrite is implemented or when need to populate stations again
	# result = Station.objects.save_stations_from_metra(data)
	return HttpResponse(json.dumps(data), content_type="application/json")

def schedule(request):
	for line in Line.objects.all():
		stations = Station.objects.filter(line=line)
		for i in range(0, stations.count() -1 ):
			for j in range(i+1, stations.count()):
				print '\t',stations[i],'\t\t', stations[j]
				# TODO: save this into a queue
			break
		break
	return HttpResponse('job started...<br />check logs')