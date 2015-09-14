from celery import Celery

from .models import Ride

app = Celery('metra_tasks', broker='django://')

METRA_API = 'http://metrarail.com/content/metra/en/home/jcr:content/trainTracker.get_train_data.json'

@app.task
def task_request_schedule(line, station_from, stations_to, date):
		response = []
		url = METRA_API + '?line=' + line.code + '&origin=' + station_from.code + '&destination=' + stations_to.code + '&date=' + date + '&futureOnly=false'
		print url
		# data = requests.get(url).json()
		data = {}
		day = 1
		Ride.objects.save_ride_from_metra(line, station_from, stations_to, day, data)
		return True