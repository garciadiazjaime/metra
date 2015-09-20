import json

from django.shortcuts import HttpResponse

from .models import Line, Station, Ride
from .utils import ScheduleHandler


def index(request):
  data = Line.objects.get_stations_from_metra()
  # TODO: uncommnet when logic to no overwrite is implemented or when need to populate stations again
  # result = Station.objects.save_stations_from_metra(data)
  return HttpResponse(json.dumps(data), content_type="application/json")

def request_schedule(request, line=None, day=None):
  schedule = ScheduleHandler()
  schedule.init_tasks(line, day)
  return HttpResponse('job started...<br />check logs')