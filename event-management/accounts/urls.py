from django.urls import path
from .views import OTPVerifyView, UserRegistrationView

urlpatterns = [
    path('register/', UserRegistrationView.as_view()),
    path('verify-otp/', OTPVerifyView.as_view()),
]
