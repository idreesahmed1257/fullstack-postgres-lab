from rest_framework import viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from django.db.models import Q
from .models import Review
from .serializers import ReviewReadSerializer, ReviewWriteSerializer


class ReviewViewSet(mixins.CreateModelMixin,
                    mixins.ListModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet):
    queryset = Review.objects.select_related("user", "book").all()

    def get_permissions(self):
        if self.action in ["create", "list"]:
            return [IsAuthenticated()]
        if self.action in ["destroy"]:
            return [IsAdminUser()]
        return [AllowAny()]

    def get_serializer_class(self):
        if self.action == "create":
            return ReviewWriteSerializer
        return ReviewReadSerializer

    def get_queryset(self):
        qs = super().get_queryset().filter(is_deleted=False)
        book_id = self.request.query_params.get("book")
        if book_id:
            qs = qs.filter(book_id=book_id)
        return qs

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.save(update_fields=["is_deleted"])
        return Response(status=status.HTTP_204_NO_CONTENT)

