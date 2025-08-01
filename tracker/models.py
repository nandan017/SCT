from django.db import models

class Participant(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=100)  # e.g., manufacturer, transporter, retailer

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    unique_id = models.CharField(max_length=100, unique=True)
    created_by = models.ForeignKey(Participant, on_delete=models.CASCADE)
    current_owner = models.ForeignKey(Participant, related_name='owned_products', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} ({self.unique_id})"


class ProductHistory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='history')
    timestamp = models.DateTimeField(auto_now_add=True)
    action = models.CharField(max_length=255)
    performed_by = models.ForeignKey(Participant, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.product.name} - {self.action} at {self.timestamp}"