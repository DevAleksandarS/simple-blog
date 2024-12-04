from flask import Blueprint, request
from decorators.api_decorator import require_api_key

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
@require_api_key
def login_route():
    """Login route"""
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    return username, password
