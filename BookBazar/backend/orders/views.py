from rest_framework import viewsets, permissions, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum, Count, Avg
from django.utils import timezone
from datetime import timedelta
from .models import Order
from .serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = Order.objects.select_related('user').prefetch_related('items__book').all()
        user = self.request.user
        if user.is_staff:
            return qs
        return qs.filter(user=user)

    def get_permissions(self):
        if self.action in ["update", "partial_update"]:
            return [IsAdminUser()]
        if self.action in ["list", "retrieve", "create", "history"]:
            return [IsAuthenticated()]
        return super().get_permissions()

    @action(detail=False, methods=['get'])
    def history(self, request):
        user = request.user
        
        # Get all orders for the user
        orders = Order.objects.filter(user=user).select_related('user').prefetch_related('items__book')
        
        # Basic stats
        total_orders = orders.count()
        total_spent = orders.filter(status=Order.STATUS_COMPLETED).aggregate(
            total=Sum('total_price')
        )['total'] or 0
        
        
        status_breakdown = orders.values('status').annotate(
            count=Count('id')
        ).order_by('status')
        
        
        history_data = {
            'summary': {
                'total_orders': total_orders,
                'total_spent': float(total_spent),
                'average_order_value': float(total_spent / total_orders) if total_orders > 0 else 0
            },
            'status_breakdown': list(status_breakdown),
        }
        
        return Response(history_data)
