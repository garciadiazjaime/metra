import json, datetime

from django.shortcuts import render, HttpResponse

from .models import Line, Station, Ride
from .tasks import task_request_schedule


class ScheduleHandler:

  def init_tasks(self, line, day):
    dates = self.get_days_to_update(day)
    for date in dates:
      lines = Line.objects.filter(code=line) if line else Line.objects.all()
      for line in lines:
        stations = Station.objects.filter(line=line)
        for i in range(0, stations.count() -1 ):
          for j in range(i+1, stations.count()):
            if Ride.objects.filter(line=line, station_from=stations[i], station_to=stations[j], day=date.weekday() + 1).count() == 0:
              task_request_schedule.delay(line, stations[i], stations[j], date)
            else:
              print "Ride: [%s] %s: %s-%s ... already saved" % (date.weekday() + 1, line.code, stations[i], stations[j])
            # break # trip
          # break # stations
        # break # lines
      # break # dates

  def get_days_to_update(self, day):
    d = datetime.datetime.today()
    next_monday = self.next_weekday(d, 0)
    return [ next_monday + datetime.timedelta(days=int(day)-1) ] if day else [ next_monday + datetime.timedelta(days=i) for i in range(0, 7) ]

  def next_weekday(self, d, weekday):
    # 0 = Monday, 1=Tuesday, 2=Wednesday...
    days_ahead = weekday - d.weekday()
    if days_ahead <= 0: # Target day already happened this week
        days_ahead += 7
    return d + datetime.timedelta(days_ahead)