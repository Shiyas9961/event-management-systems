from .serializers import UserRegistrationSerializer, OTPVerifySerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class UserRegistrationView(APIView) :

    def post(self, request) :
        data = request.data
        serializer = UserRegistrationSerializer(data=data)

        if serializer.is_valid() :
            serializer.save()

            return Response({
                'message' : 'User create. Check your email for getting OTP'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class OTPVerifyView(APIView) :

    def post(self, request) :
        data = request.data
        serializer = OTPVerifySerializer(data=data)

        if serializer.is_valid() :
            serializer.save()

            return Response({
                'message' : 'Email verified successfully'
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)