import requests, json, datetime

from django.db import models


class LineManager(models.Manager):
	
	def get_stations_from_metra(self):
		'''
			Helper function to get Stations from Metra Website
		'''
		lines = self.all()
		response = []
		for line in lines:
			url = 'http://metrarail.com/content/metra/en/home/jcr:content/trainTracker.get_stations_from_line.json?trackerNumber=0&trainLineId=%s' % line.code
			data = requests.get(url).json()
			# if response has 'success' key it means we have data
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
				print "no stations for line %s" % (line)

		if len(response):
			response.sort(key=lambda x: x['line_id'])
		
		return response


class StationManager(models.Manager):

	def save_stations_from_metra(self, data):
		'''
			Helper function to save stations (data) recevied into the DB
		'''
		total_stations_created = 0
		if len(data):
			for line in data:
				if 'line_id' in line and len(line['stations']):
					for station in line['stations']:
						if 'code' in station and 'name' in station:
							if self.filter(code=station['code'], name=station['name'], line_id=line['line_id']).count() == 0:
								self.create(code=station['code'], name=station['name'], line_id=line['line_id'])
								total_stations_created += 1
							else:
								print "Station on %s on line %s already saved" % (station['code'], line['line_id'])
		print "%s Stations created" % (total_stations_created)


class RideManager(models.Manager):

	def save_ride_from_metra(self, line, station_from, station_to, day, data):
		'''
			Helper function to save rides. This funtionis called from the Task running (celery)
		'''
		rides = []
		# check if the ride hasn't been already saved
		if self.filter(line=line, station_from=station_from, station_to=station_to, day=day).count() == 0:
			for key in data:
				# check if data has keyword 'train'. This keywords is presented on Metra API response
				if 'train' in key:
					# when status == 0 it means Metra API returned no data
					if 'status' in data[key] and data[key]['status'] == 0:
						print "Ride: [%s] %s: %s-%s ... with not data" % (day, line.code, station_from.code, station_to.code)
					else:
						# an array is created for the rides so we can sort them later by train_num
						rides.append({
							'line': line,
							'station_from': station_from,
							'station_to': station_to,
							'day': day,
							'time_start': datetime.datetime.strptime(data[key]['scheduled_dpt_time'] + ' ' + data[key]['schDepartInTheAM'], '%I:%M %p'),
							'time_end': datetime.datetime.strptime(data[key]['scheduled_arv_time'] + ' ' + data[key]['schArriveInTheAM'], '%I:%M %p'),
							'trip': data[key]['trip_id'],
							'train_num': data[key]['train_num'],
							'allow_bikes': True if data[key]['bikesText'].lower() == 'yes' else False
						})

			if len(rides):
				# we sort rides so they got inserted into the DB by order
				for ride in sorted(rides, key=lambda ride: ride['train_num']):
					self.create(line=ride['line'], station_from=ride['station_from'], station_to=ride['station_to'], day=ride['day'], time_start=ride['time_start'], time_end=ride['time_end'], trip=ride['trip'], train_num=ride['train_num'], allow_bikes=ride['allow_bikes'])
					print "Ride: [%s] %s: %s-%s at %s...saved" % (day, line.code, station_from.code, station_to.code, ride['time_start'])
		else:
			print "[%s] %s: %s-%s  already saved" % (day, line.code, station_from.code, station_to.code)
		return True


