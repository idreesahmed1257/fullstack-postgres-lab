from django.shortcuts import render
from .models import Book
from django.db.models import Avg, Q
from .serializers import BookSerializer
from rest_framework import viewsets, permissions
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend


class BookPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100
    page_query_param = "page"


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    pagination_class = BookPagination

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = {
        "price": ["gte", "lte"],
        "genre": ["exact", "icontains"],
        "author": ["exact", "icontains"],
    }
    search_fields = ["title"]
    ordering_fields = ["price", "published_date"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:

            return [AllowAny()]
        return [IsAdminUser()]

    def get_queryset(self):
        qs = Book.objects.all()

        qs = qs.annotate(
            avg_rating=Avg("reviews__rating", filter=Q(reviews__is_deleted=False))
        )
        return qs
