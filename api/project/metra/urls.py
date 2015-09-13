from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^schedule$', views.request_schedule, name='request_schedule'),
	url(r'^schedule/task$', views.run_schedule_task, name='run_schedule_task')
]