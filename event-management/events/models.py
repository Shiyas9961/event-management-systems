from django.db import models
from django.contrib.auth.models import User

class Event(models.Model) :

    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateTimeField()
    capacity = models.PositiveIntegerField()
    participents = models.ManyToManyField(User, related_name='events_participated', blank=True)

    def __str__(self) :
        return self.title
    
class EventRegistration(models.Model) :

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    registered_at = models.DateTimeField(auto_now_add=True)