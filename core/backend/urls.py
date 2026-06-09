from django.urls import path

from .views import admission_create, contact_message_create

urlpatterns = [
    path("admissions/", admission_create, name="admission-create"),
    path("messages/", contact_message_create, name="contact-message-create"),
]
