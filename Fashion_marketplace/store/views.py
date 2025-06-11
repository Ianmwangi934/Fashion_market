from django.shortcuts import render,get_object_or_404
from rest_framework import generics, permissions
from .models import Products,Category,Cart,CartItem,ShippingAddress,Order
from .serializers import ProductsSerializer,CategorySerializer,CartSerializer,RegisterSerializer,ShippingAddressSerializer,OrderSerializer,OrderCheckoutSerializer
from django.contrib.auth.models import User
from rest_framework.generics import ListAPIView
from rest_framework.generics import RetrieveAPIView,CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View


# Create your views here.
class ProductsCreateAPIView(generics.CreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    permission_classes = [permissions.AllowAny]
    

class CategoryListAPIView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    

class ProductsListAPIView(generics.ListAPIView):
    queryset = Products.objects.all().order_by('date_uploaded')
    serializer_class = ProductsSerializer
    permission_classes = [permissions.AllowAny]

class ProductsDetailAPIView(RetrieveAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    lookup_field = 'id'
    permission_classes = [permissions.AllowAny]

class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated] #only JWT authenticated user

    def get(self,request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

        


class AddToCartView(APIView):
    permission_classes = [permissions.IsAuthenticated] #only JWT authenticated user

    def post(self, request):
        products_id = request.data.get("products_id")
        quantity = int(request.data.get("quantity",1))

        cart, created = Cart.objects.get_or_create(user=request.user)
        product = Products.objects.get(id=products_id)
        item, created = CartItem.objects.get_or_create(cart=cart, product=product)

        item.quantity +=quantity
        item.save()

        return Response({"message":"Added to cart"})

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny] #Allow any user to access the Registration view and create an account
    serializer_class = RegisterSerializer

class ShippingAddressView(generics.CreateAPIView):
    serializer_class = ShippingAddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    

class CreateOrderView(CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        order_id = response.data.get("id")
        return Response({"message": "Order created","id": order_id})

class UserOrderView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
    

    def get_queryset(self):
        qs = Order.objects.filter(user=self.request.user)
        return qs

class OrderCheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        order = get_object_or_404(Order, id=order_id, user= request.user)
        serializer = OrderCheckoutSerializer(order)
        return Response(serializer.data)





    
