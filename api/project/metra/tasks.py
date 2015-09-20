import requests
from celery import Celery

from .models import Ride

app = Celery('metra_tasks', backend='rpc://', broker='django://')

METRA_API = 'http://metrarail.com/content/metra/en/home/jcr:content/trainTracker.get_train_data.json'

@app.task
def task_request_schedule(line, station_from, stations_to, date):
	'''
		Task runned by celery. Helps to query Metra API in an "async" way
	'''
	url = METRA_API + '?line=' + line.code + '&origin=' + station_from.code + '&destination=' + stations_to.code + '&date=' + date.strftime('%m/%d/%Y') + '&futureOnly=false'
	print url
	data = requests.get(url).json()
	Ride.objects.save_ride_from_metra(line, station_from, stations_to, date.weekday() + 1, data)
	return True