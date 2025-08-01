from django.contrib import admin
from .models import Product, Participant, ProductHistory

# Register your models here.

admin.site.register(Product)
admin.site.register(Participant)
admin.site.register(ProductHistory)