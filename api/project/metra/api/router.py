from rest_framework import routers

from .views import LineViewSet, StationViewSet, RidesViewSet

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'lines', LineViewSet)
router.register(r'stations', StationViewSet)
router.register(r'rides', RidesViewSet)