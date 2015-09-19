from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^schedule$', views.request_schedule, name='request_schedule'),
	url(r'^schedule/(?P<line>[\w-]+)$', views.request_schedule, name='request_schedule')
]