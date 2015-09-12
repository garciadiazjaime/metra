from django.contrib import admin
from .models import Line, Zone, Station

class LineAdmin(admin.ModelAdmin):
	list_display = ('id', 'name', 'code', 'link')

class StationAdmin(admin.ModelAdmin):
	list_display = ('code', 'name', 'latitud', 'longitude', 'zone', 'url', 'line')
	list_filter = ('line',)
	search_fields = ['code', 'name']

admin.site.register(Line, LineAdmin)
admin.site.register(Zone)
admin.site.register(Station, StationAdmin)

