import json

from django.shortcuts import render, HttpResponse

from .models import Line, Station, Ride
from .tasks import task_request_schedule


def index(request):
  data = Line.objects.get_stations_from_metra()
  # TODO: uncommnet when logic to no overwrite is implemented or when need to populate stations again
  # result = Station.objects.save_stations_from_metra(data)
  return HttpResponse(json.dumps(data), content_type="application/json")

def request_schedule(request, line=None):
  date = '09/14/2015'
  day = 1
  lines = Line.objects.filter(code=line) if line else Line.objects.all()
  for line in lines:
    stations = Station.objects.filter(line=line)
    for i in range(0, stations.count() -1 ):
      for j in range(i+1, stations.count()):
        if Ride.objects.filter(line=line, station_from=stations[i], station_to=stations[j], day=day).count() == 0:
          task_request_schedule.delay(line, stations[i], stations[j], date)
        else:
          print "Ride: [%s] %s: %s-%s ... already saved" % (day, line.code, stations[i], stations[j])
        break
      break
    break
  return HttpResponse('job started...<br />check logs')