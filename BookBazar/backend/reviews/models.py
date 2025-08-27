from django.db import models
from django.contrib.auth.models import User
from books.models import Book


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviews")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="reviews")
    rating = models.PositiveSmallIntegerField()
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        unique_together = ("user", "book")
        ordering = ("-created_at",)

    def __str__(self):
        return f"Review({self.book.title} by {self.user.username} - {self.rating})"

    def clean(self):
        # Lazy import to avoid hard dependency on Django forms in model import
        from django.core.exceptions import ValidationError

        if self.rating < 1 or self.rating > 5:
            raise ValidationError({"rating": "Rating must be between 1 and 5."})
