from rest_framework import serializers
from django.db import IntegrityError
from .models import Review


class ReviewReadSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ("id", "user", "book", "rating", "comment", "created_at")
        read_only_fields = ("id", "user", "created_at", "book")

    def get_user(self, obj):
        return {
            "id": obj.user.id,
            "username": obj.user.username,
        }


class ReviewWriteSerializer(serializers.ModelSerializer):
    book = serializers.IntegerField(write_only=True)

    class Meta:
        model = Review
        fields = ("book", "rating", "comment")

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value

    def validate(self, attrs):
        request = self.context.get("request")
        user = getattr(request, "user", None)
        book_id = attrs.get("book")
        if not user or not user.is_authenticated:
            return attrs

        if Review.objects.filter(user=user, book_id=book_id, is_deleted=False).exists():
            raise serializers.ValidationError("You have already reviewed this book")
        return attrs

    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user
        try:
            return Review.objects.create(
                user=user,
                book_id=validated_data["book"],
                rating=validated_data["rating"],
                comment=validated_data.get("comment", ""),
            )
        except IntegrityError:
            # Handles the DB-level unique constraint (user, book) to avoid 500s
            # and return a friendly validation error instead
            raise serializers.ValidationError("You have already reviewed this book")


