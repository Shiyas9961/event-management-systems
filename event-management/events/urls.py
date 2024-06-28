from django.urls import path
from .views import EventListView, EventDetailView, EventRegView, UserEventView

urlpatterns = [
    path('', EventListView.as_view()),
    path('<int:pk>/', EventDetailView.as_view()),
    path('<int:pk>/register/', EventRegView.as_view()),
    path('my-events/', UserEventView.as_view())
]
