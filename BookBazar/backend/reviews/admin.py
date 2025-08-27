from django.contrib import admin
from .models import Review


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("id", "book", "user", "rating", "is_deleted", "created_at")
    list_filter = ("rating", "is_deleted", "created_at")
    search_fields = ("book__title", "user__username", "comment")
