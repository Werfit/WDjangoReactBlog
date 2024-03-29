from rest_framework import routers
from .views import PostViewSet

router = routers.DefaultRouter()
router.register('posts', PostViewSet, 'posts')

urlpatterns = router.urls