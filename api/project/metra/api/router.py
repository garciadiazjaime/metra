from rest_framework import routers

from .views import LineViewSet

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'lines', LineViewSet)