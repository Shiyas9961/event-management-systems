from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.mail import send_mail
from random import randint
from main_app import settings
from .models import Profile

class UserRegistrationSerializer(serializers.ModelSerializer) :
    password = serializers.CharField(write_only = True)

    class Meta :
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        otp = str(randint(100000, 999999))
        Profile.objects.create(user=user, otp=otp)

        user.save()
        send_mail(
            'OTP Verification',
            f'Your OTP is {user.profile.otp}',
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False
        )
        return user
    
class OTPVerifySerializer(serializers.Serializer) :
    email = serializers.EmailField()
    otp = serializers.CharField(max_length = 6)

    def validate(self, data):
        try:
            user = User.objects.get(email = data['email'])
        except User.DoesNotExist :
            raise serializers.ValidationError('User not found')
        
        if user.profile.otp != data['otp'] :
            raise serializers.ValidationError('Wrong OTP')
        
        return data
    
    def save(self):
        user = User.objects.get(email = self.validated_data['email'])
        user.profile.email_verified = True
        user.profile.otp = ''
        user.profile.save()
        return user