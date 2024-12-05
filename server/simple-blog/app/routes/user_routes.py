from flask import Blueprint, request, jsonify
from decorators.api_decorator import require_api_key
from models.users_model import User
from database import db
from services.user_service import create_user, block_user

user_bp = Blueprint("users", __name__)


@user_bp.route("/<int:user_id>", methods=["GET"])
@require_api_key
def get_user_route(user_id):
    """Get user by ID"""

    return user_id


@user_bp.route("/create", methods=["POST"])
@require_api_key
def create_user_route():
    """Create a new user"""

    data = request.get_json()

    if not data:
        return (
            jsonify(
                {"error": "Invalid request", "message": "Request body must be JSON"}
            ),
            400,
        )

    else:
        [success, response, code, user_id] = create_user(data)

        if success:
            return (
                jsonify({"message": response["message"], "userId": user_id}),
                code,
            )

        else:
            return (
                jsonify({"message": response["message"], "error": response["error"]}),
                code,
            )


@user_bp.route("/block/<int:user_id>", methods=["POST"])
@require_api_key
def block_user_route(user_id: int):
    """Blocks user"""

    [success, response, code] = block_user(user_id)

    if success:
        return (
            jsonify({"message": response["message"]}),
            code,
        )

    else:
        return (
            jsonify({"message": response["message"], "error": response["error"]}),
            code,
        )
