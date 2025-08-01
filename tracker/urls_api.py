from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .api_views import (
    ProductListCreateView, ProductDetailView,
    ParticipantListCreateView, ParticipantDetailView,
    ProductHistoryListCreateView
)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Product endpoints
    path('api/products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('api/products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    # Participant endpoints
    path('api/participants/', ParticipantListCreateView.as_view(), name='participant-list-create'),
    path('api/participants/<int:pk>/', ParticipantDetailView.as_view(), name='participant-detail'),
    # Product History endpoints
    path('api/product-history/', ProductHistoryListCreateView.as_view(), name='product-history-list-create'),
]