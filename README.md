# Event Management System

A simple event management system built with Django Rest Framework (backend) and React (frontend).

## Features

### Backend (Django Rest Framework)
- User Authentication:
  - Register, log in, and log out using JWT for authentication.
  - On first registration, send an OTP verification email.
- Event Management:
  - RESTful API for events (create, read, update, delete).
  - Each event has a title, description, date, and capacity (max participants).
- Event Registration:
  - Endpoint for users to register for an event.
  - Send a confirmation email upon successful registration.
  - Prevent registration for fully booked events.
- User Events:
  - Endpoint to list all events a user has registered for.

### Frontend (React)
- Authentication Pages:
  - Registration and login pages.
- Event Pages:
  - Display a list of events, event details, and forms to create/edit events.
  - Page to view events a user has registered for.
- Event Registration:
  - Allow event registration from the event details page.
  - Display message if the event is fully booked.
- State Management:
  - Use Context API.
- Styling:
  - Use Tailwind CSS framework.

## Frontend Setup Instructions

1. **Clone the Repository**
   ```sh
   git clone https://github.com/Shiyas9961/event-management-system.git
   cd event-management-systems/fronten-event
   npm install
   npm start

## Backend Setup Instructions

1. **Clone the Repository**
   ```sh
   git clone https://github.com/Shiyas9961/event-management-systems.git
   cd event-management-systems/event-management
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   python3 manage.py runserver