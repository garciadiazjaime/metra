from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^schedule$', views.request_schedule, name='request_schedule'),
	url(r'^schedule/(?P<line>[\w-]+)/(?P<day>[1-7]?)$', views.request_schedule, name='request_schedule')
]