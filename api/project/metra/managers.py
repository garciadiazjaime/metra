import requests, json

from django.db import models

from .utils import bubble_sort

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