from django.contrib import admin

from .models import AdmissionRequest, ContactMessage


@admin.register(AdmissionRequest)
class AdmissionRequestAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "surname",
        "phone",
        "education_type",
        "education_form",
        "education_language",
        "direction",
        "created_at",
    )
    list_filter = ("education_type", "education_form", "education_language", "created_at")
    search_fields = ("name", "surname", "phone", "extra_phone", "direction")
    readonly_fields = ("created_at",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "email", "created_at")
    list_filter = ("created_at",)
    search_fields = ("name", "phone", "email", "message")
    readonly_fields = ("created_at",)
