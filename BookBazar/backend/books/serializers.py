from rest_framework import serializers
from books.models import Book
from reviews.models import Review


class NestedReviewSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ("id", "user", "rating", "comment", "created_at")

    def get_user(self, obj):
        return {"id": obj.user.id, "username": obj.user.username}


class BookSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    average_rating = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Book
        fields = "__all__"

    def get_reviews(self, obj):
        request = self.context.get("request")

        if request and getattr(request, "parser_context", None):
            view = request.parser_context.get("view")
            if getattr(view, "action", None) == "retrieve":
                qs = obj.reviews.filter(is_deleted=False).select_related("user")
                return NestedReviewSerializer(qs, many=True).data
        return []

    def get_average_rating(self, obj):
        value = getattr(obj, "avg_rating", None)
        if value is None:
            return None
        try:
            return round(float(value), 1)
        except Exception:
            return None
