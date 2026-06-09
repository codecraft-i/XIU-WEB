import json
import re

from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import AdmissionRequest, ContactMessage

PHONE_DIGITS_RE = re.compile(r"\D")


def _json_error(message, status=400, field_errors=None):
    payload = {"success": False, "message": message}
    if field_errors:
        payload["errors"] = field_errors
    return JsonResponse(payload, status=status)


def _parse_json_body(request):
    try:
        return json.loads(request.body.decode("utf-8") or "{}")
    except (json.JSONDecodeError, UnicodeDecodeError):
        return None


def _normalize_phone(value):
    digits = PHONE_DIGITS_RE.sub("", value or "")
    if digits.startswith("998"):
        digits = digits[3:]
    return digits


def _handle_options(request):
    if request.method == "OPTIONS":
        return JsonResponse({}, status=204)
    return None


@csrf_exempt
def admission_create(request):
    options_response = _handle_options(request)
    if options_response:
        return options_response

    if request.method != "POST":
        return _json_error("Faqat POST so'rovi qabul qilinadi.", status=405)

    data = _parse_json_body(request)
    if data is None:
        return _json_error("JSON format noto'g'ri.")

    errors = {}
    phone_digits = _normalize_phone(data.get("phone"))
    extra_phone_digits = _normalize_phone(data.get("extraPhone"))

    if len(phone_digits) != 9:
        errors["phone"] = "Telefon raqam to'liq bo'lishi kerak."

    if extra_phone_digits and len(extra_phone_digits) != 9:
        errors["extraPhone"] = "Qo'shimcha telefon raqam to'liq bo'lishi kerak."

    for field in ("name", "surname"):
        if len((data.get(field) or "").strip()) < 2:
            errors[field] = "Kamida 2 ta belgi kiriting."

    required_choice_fields = {
        "educationType": "Ta'lim turi",
        "educationForm": "Ta'lim shakli",
        "educationLanguage": "Ta'lim tili",
        "direction": "Ta'lim yo'nalishi",
    }
    for field, label in required_choice_fields.items():
        if not (data.get(field) or "").strip():
            errors[field] = f"{label} tanlanishi kerak."

    if errors:
        return _json_error("Forma tekshiruvdan o'tmadi.", field_errors=errors)

    record = AdmissionRequest.objects.create(
        phone=f"+998 {data['phone'].strip()}",
        extra_phone=f"+998 {data['extraPhone'].strip()}" if (data.get("extraPhone") or "").strip() else "",
        name=data["name"].strip(),
        surname=data["surname"].strip(),
        education_type=data["educationType"].strip(),
        education_form=data["educationForm"].strip(),
        education_language=data["educationLanguage"].strip(),
        direction=data["direction"].strip(),
    )

    return JsonResponse(
        {"success": True, "message": "Ariza qabul qilindi.", "id": record.id},
        status=201,
    )


@csrf_exempt
def contact_message_create(request):
    options_response = _handle_options(request)
    if options_response:
        return options_response

    if request.method != "POST":
        return _json_error("Faqat POST so'rovi qabul qilinadi.", status=405)

    data = _parse_json_body(request)
    if data is None:
        return _json_error("JSON format noto'g'ri.")

    errors = {}
    name = (data.get("name") or "").strip()
    message = (data.get("message") or "").strip()
    phone = (data.get("phone") or "").strip()
    email = (data.get("email") or "").strip()

    if len(name) < 2:
        errors["name"] = "Ism kamida 2 ta belgidan iborat bo'lishi kerak."

    if phone and len(PHONE_DIGITS_RE.sub("", phone)) != 12:
        errors["phone"] = "Telefon raqam to'liq bo'lishi kerak."

    if email:
        try:
            validate_email(email)
        except ValidationError:
            errors["email"] = "Email manzil noto'g'ri."

    if len(message) < 10:
        errors["message"] = "Xabar matni kamida 10 ta belgidan iborat bo'lishi kerak."

    if errors:
        return _json_error("Forma tekshiruvdan o'tmadi.", field_errors=errors)

    record = ContactMessage.objects.create(
        name=name,
        phone=phone,
        email=email,
        message=message,
    )

    return JsonResponse(
        {"success": True, "message": "Xabar qabul qilindi.", "id": record.id},
        status=201,
    )
