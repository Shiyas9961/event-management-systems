from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from main_app import settings
from .serializers import EventSerializer, EventRegisterSerializer
from django.shortcuts import get_object_or_404
from .models import Event, EventRegistration
from django.core.mail import send_mail

class EventListView(APIView) :
    permission_classesc = [IsAuthenticated]

    def get(self, request) :

        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request) :

        data = request.data
        event_serializer = EventSerializer(data=data)

        if event_serializer.is_valid() :
            event_serializer.save()
            return Response(event_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(event_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class EventDetailView(APIView) :

    permission_classes = [IsAuthenticated]

    def get(self, request, pk) :

        event = Event.objects.get(pk=pk)
        event_serializer = EventSerializer(event)
        return Response(event_serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk) :

        data = request.data
        event = Event.objects.get(pk=pk)
        event_serializer = EventSerializer(event, data=data, partial=True)

        if event_serializer.is_valid() :
            event_serializer.save()
            return Response(event_serializer.data, status=status.HTTP_202_ACCEPTED)
        
        return Response(event_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk) :

        event = get_object_or_404(Event, pk=pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class EventRegView(APIView) :

    permission_classes = [ IsAuthenticated ]

    def post(self, request, pk) :
        user = request.user
        event = Event.objects.get(pk=pk)

        if event.participents.count() >= event.capacity :
            return Response({
                'message' : 'Event is fully booked'
            }, status=status.HTTP_400_BAD_REQUEST)
        event.participents.add(user)
        event.save()
        resgistration, created = EventRegistration.objects.get_or_create(user=user, event=event)

        if created :
            send_mail(
                'Event Reg Confirmation',
                f'You have successfully reg Event for {event.title}',
                settings.EMAIL_HOST_USER,
                [user.email],
                fail_silently=False
            )
            return Response({
                'message' : 'Regsitration successful'
            }, status=status.HTTP_201_CREATED)
        else :
            return Response({
                'message' : 'You already reg for this event'
            }, status=status.HTTP_200_OK)
        
class UserEventView(APIView) :

    permission_classes = [IsAuthenticated]

    def get(self, request) :

        user = request.user
        events = user.eventevents_participated
        event_ser = EventSerializer(events, many=True)
        return Response(event_ser.data, status=status.HTTP_200_OK)
