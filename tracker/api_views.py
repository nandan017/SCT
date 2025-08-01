from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Product, Participant, ProductHistory
from .serializers import ProductSerializer, ParticipantSerializer, ProductHistorySerializer

# List all products / create a new product
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

# Get, update or delete a specific product
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

# Same for Participant
class ParticipantListCreateView(generics.ListCreateAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    permission_classes = [IsAuthenticated]

class ParticipantDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    permission_classes = [IsAuthenticated]

# Product History
class ProductHistoryListCreateView(generics.ListCreateAPIView):
    queryset = ProductHistory.objects.all()
    serializer_class = ProductHistorySerializer
    permission_classes = [IsAuthenticated]