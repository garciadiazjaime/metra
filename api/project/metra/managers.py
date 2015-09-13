import requests, json

from django.db import models


class LineManager(models.Manager):
	
	def get_stations_from_metra(self):
		lines = self.all()
		response = []
		for line in lines:
			url = 'http://metrarail.com/content/metra/en/home/jcr:content/trainTracker.get_stations_from_line.json?trackerNumber=0&trainLineId=%s' % line.code
			data = requests.get(url).json()
			if data and data['success']:
				stations = []
				for station in data['stations']:
					stations.append({
						'code': data['stations'][station]['id'],
						'name': data['stations'][station]['name'],
						'station_id': int(station)
						})
				if len(stations):
					stations.sort(key=lambda x: x['station_id'])
					response.append({
						'line_id': line.id,
						'stations': stations
						})
			else:
				print 'no data'

		if len(response):
			response.sort(key=lambda x: x['line_id'])
		
		return response


class StationManager(models.Manager):

	def save_stations_from_metra(self, data):
		if len(data):
			for line in data:
				if 'line_id' in line and len(line['stations']):
					for station in line['stations']:
						if 'code' in station and 'name' in station:
							print self.create(code=station['code'], name=station['name'], line_id=line['line_id'])
		return 'nice'

	def task_schedule(self, line, station_from, stations_to):
		response = []
		print line, station_from, stations_to
		url = 'http://metrarail.com/content/metra/en/home/jcr:content/trainTracker.get_train_data.json?line=' + line + '&origin=' + station_from + '&destination=' + stations_to + '&date=09/14/2015&futureOnly=false'
		print url
		data = requests.get(url).json()
		return data

class RideManager(models.Manager):

	def save_ride_from_metra(self, line, station_from, station_to, day, data):
		if self.filter(line=line, station_from=station_from, station_to=station_to, day=day).count() == 0:
			for key in data:
				if 'train' in key:
					ride_info = {
						'time_start': data[key]['scheduled_dpt_time'],
						'time_end': data[key]['scheduled_arv_time'],
						'trip': data[key]['trip_id'],
						'train_num': data[key]['train_num']
					}
					print 'ride_info', ride_info
					self.create(line=line, station_from=station_from, station_to=station_to, day=day, time_start=ride_info['time_start'], time_end=ride_info['time_end'], trip=ride_info['trip'], train_num=ride_info['train_num'])
		else:
			print 'Ride', line, ':', station_from,',', station_to,'has been already saved'
		return True


