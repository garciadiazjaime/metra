import json, datetime

from django.shortcuts import render, HttpResponse

from .models import Line, Station, Ride
from .tasks import task_request_schedule


class ScheduleHandler:

  def init_tasks(self, line, day):
    '''
      Function executed by the view and in charge of start celery tasks
    '''
    dates = self.get_days_to_update(day)
    lines = Line.objects.filter(code=line) if line else Line.objects.all()
    
    for date in dates:
      for line in lines:
        stations = Station.objects.filter(line=line)
        for i in range(0, stations.count() -1 ):
          for j in range(i+1, stations.count()):
            # Inbound
            if Ride.objects.filter(line=line, station_from=stations[i], station_to=stations[j], day=date.weekday() + 1).count() == 0:
              print "Ride: [%s] %s: %s-%s ... init_tasks" % (date.weekday() + 1, line.code, stations[i], stations[j])
              task_request_schedule.delay(line, stations[i], stations[j], date)
            else:
              print "Ride: [%s] %s: %s-%s ... already saved" % (date.weekday() + 1, line.code, stations[i], stations[j])

            # Outbound
            if Ride.objects.filter(line=line, station_from=stations[j], station_to=stations[i], day=date.weekday() + 1).count() == 0:
              print "Ride: [%s] %s: %s-%s ... init_tasks" % (date.weekday() + 1, line.code, stations[j], stations[i])
              task_request_schedule.delay(line, stations[j], stations[i], date)
            else:
              print "Ride: [%s] %s: %s-%s ... already saved" % (date.weekday() + 1, line.code, stations[j], stations[i])
            # break # trip
          # break # stations
        # break # lines
      # break # dates

  def get_days_to_update(self, day):
    '''
      Returns an array with one value if day is received or an array with the whole week in it. Takes next monday as the index 0
    '''
    today = datetime.datetime.today()
    next_monday = self.next_weekday(today, 0)
    return [ next_monday + datetime.timedelta(days=int(day)-1) ] if day else [ next_monday + datetime.timedelta(days=i) for i in range(0, 7) ]

  def next_weekday(self, date, weekday):
    '''
      Function to get next monday based on a date
    '''
    # 0 = Monday, 1=Tuesday, 2=Wednesday...
    days_ahead = weekday - date.weekday()
    if days_ahead <= 0: # Target day already happened this week
        days_ahead += 7
    return date + datetime.timedelta(days_ahead)