from flask import Blueprint, request, jsonify
from decorators.api_decorator import require_api_key
from services.user_service import get_user_by_username
from flask_jwt_extended import create_access_token, create_refresh_token

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
@require_api_key
def login_route():
    """Login route"""
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    [success, code, user, error] = get_user_by_username(username)

    if not success:
        return jsonify({"error": error}), code

    if not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.username)
    refresh_token = create_refresh_token(identity=user.username)

    """TODO: Take a look at this when we implment fully login logic"""

    return (
        jsonify(
            {
                "tokens": {"access": access_token, "refresh": refresh_token},
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
            }
        ),
        200,
    )
