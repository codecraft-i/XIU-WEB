import json

from django.test import TestCase

from .models import AdmissionRequest, ContactMessage


class AdmissionApiTests(TestCase):
    def test_create_admission(self):
        payload = {
            "phone": "90-123-45-67",
            "extraPhone": "91-765-43-21",
            "name": "Ali",
            "surname": "Karimov",
            "educationType": "Bakalavr",
            "educationForm": "Kunduzgi",
            "educationLanguage": "O‘zbek",
            "direction": "Iqtisodiyot",
        }

        response = self.client.post(
            "/api/admissions/",
            data=json.dumps(payload),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(AdmissionRequest.objects.count(), 1)
        self.assertEqual(AdmissionRequest.objects.get().name, "Ali")


class ContactMessageApiTests(TestCase):
    def test_create_message(self):
        payload = {
            "name": "Madina",
            "phone": "+998 90 123 45 67",
            "email": "madina@example.com",
            "message": "Kontrakt va qabul jarayoni haqida ma'lumot kerak.",
        }

        response = self.client.post(
            "/api/messages/",
            data=json.dumps(payload),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(ContactMessage.objects.count(), 1)
        self.assertEqual(ContactMessage.objects.get().email, "madina@example.com")

    def test_message_validation_error(self):
        payload = {
            "name": "A",
            "message": "short",
        }

        response = self.client.post(
            "/api/messages/",
            data=json.dumps(payload),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("errors", response.json())

# Create your tests here.
