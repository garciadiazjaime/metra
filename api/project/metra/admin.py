from django.contrib import admin
from .models import Line, Zone, Station, Ride

class LineAdmin(admin.ModelAdmin):
	list_display = ('id', 'name', 'code', 'link')

class StationAdmin(admin.ModelAdmin):
	list_display = ('code', 'name', 'latitud', 'longitude', 'zone', 'url', 'line')
	list_filter = ('line',)
	search_fields = ['code', 'name']

class RideAdmin(admin.ModelAdmin):
	list_display = ('line', 'station_from', 'station_to', 'time_start', 'time_end', 'trip', 'train_num', 'day')
	list_filter = ('line', 'day')

admin.site.register(Line, LineAdmin)
admin.site.register(Zone)
admin.site.register(Station, StationAdmin)
admin.site.register(Ride, RideAdmin)
