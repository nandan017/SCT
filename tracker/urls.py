from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ParticipantViewSet, ProductHistoryViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'participants', ParticipantViewSet)
router.register(r'history', ProductHistoryViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]