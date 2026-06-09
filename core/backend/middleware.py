import os


class ApiCorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.allowed_origin = os.environ.get("FRONTEND_ORIGIN", "http://localhost:5173")

    def __call__(self, request):
        response = self.get_response(request)

        if request.path.startswith("/api/"):
            response["Access-Control-Allow-Origin"] = self.allowed_origin
            response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
            response["Access-Control-Allow-Headers"] = "Content-Type"

        return response
