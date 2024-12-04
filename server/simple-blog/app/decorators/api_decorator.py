from functools import wraps
from flask import request, jsonify, current_app


def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Get the API key from the request header
        api_key = request.headers.get("Authorization")

        # Validate the API key
        if not api_key or api_key != current_app.config.get("API_SECRET_KEY"):
            return jsonify({"error": "Unauthorized"}), 401

        return f(*args, **kwargs)

    return decorated_function
