from django.core.validators import EmailValidator
from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
        ordering = ["-created_at"]


class AdmissionRequest(TimestampedModel):
    phone = models.CharField(max_length=20)
    extra_phone = models.CharField(max_length=20, blank=True)
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    education_type = models.CharField(max_length=50)
    education_form = models.CharField(max_length=50)
    education_language = models.CharField(max_length=50)
    direction = models.CharField(max_length=150)

    class Meta:
        verbose_name = "Qabul arizasi"
        verbose_name_plural = "Qabul arizalari"

    def __str__(self):
        return f"{self.name} {self.surname} - {self.direction}"


class ContactMessage(TimestampedModel):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True, validators=[EmailValidator()])
    message = models.TextField(max_length=1200)

    class Meta:
        verbose_name = "Yuborilgan xabar"
        verbose_name_plural = "Yuborilgan xabarlar"

    def __str__(self):
        return f"{self.name} - {self.created_at:%Y-%m-%d %H:%M}"
