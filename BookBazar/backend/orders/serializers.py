from rest_framework import serializers
from django.db import transaction
from books.models import Book
from .models import Order, OrderItem


class OrderItemWriteSerializer(serializers.Serializer):
    book_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)


class OrderItemReadSerializer(serializers.ModelSerializer):
    book = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ("book", "quantity", "unit_price")

    def get_book(self, obj):
        return {
            "id": obj.book.id,
            "title": obj.book.title,
            "author": obj.book.author,
            "price": str(obj.book.price),
            "quantity_available": obj.book.stock,
        }


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemReadSerializer(many=True, read_only=True)
    new_items = OrderItemWriteSerializer(many=True, write_only=True, required=True)

    class Meta:
        model = Order
        fields = ("id", "user", "status", "total_price", "created_at", "items", "new_items")
        read_only_fields = ("id", "user", "total_price", "created_at")

    def validate_new_items(self, value):
        if not value:
            raise serializers.ValidationError("At least one item is required")
        return value

    @transaction.atomic
    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user
        items_data = validated_data.pop("new_items", [])

        order = Order.objects.create(user=user, status=Order.STATUS_PENDING)
        total = 0

        for item in items_data:
            try:
                book = Book.objects.select_for_update().get(id=item["book_id"])
            except Book.DoesNotExist:
                raise serializers.ValidationError({"new_items": f"Book {item['book_id']} not found"})

            quantity = item["quantity"]
            unit_price = book.price

            if book.stock < quantity:
                raise serializers.ValidationError({"new_items": f"Book '{book.title}' not available in required quantity (in stock: {book.stock})"})

            book.stock -= quantity
            book.save(update_fields=["stock"])

            OrderItem.objects.create(order=order, book=book, quantity=quantity, unit_price=unit_price)
            total += unit_price * quantity

        order.total_price = total
        order.save(update_fields=["total_price"])
        return order

    def update(self, instance, validated_data):
        instance.status = validated_data.get("status", instance.status)
        instance.save(update_fields=["status"])
        return instance


