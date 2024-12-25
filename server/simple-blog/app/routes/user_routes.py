from flask import Blueprint, request, jsonify
from decorators.api_decorator import require_api_key
from services.user_service import create_admin, create_user, block_user
from models.users_model import User

user_bp = Blueprint("users", __name__)


@user_bp.route("/<int:user_id>", methods=["GET"])
@require_api_key
def get_user_route(user_id):
    """Get user by ID"""

    return user_id


@user_bp.route("/create-admin", methods=["POST"])
@require_api_key
def create_admin_route():
    """Create admin if there isn't users in system"""

    data = request.get_json()

    if not data:
        return (
            jsonify({"error": "Invalid request"}),
            400,
        )

    else:
        [success, code, user_id, error] = create_admin(data)

        if success:
            return (
                jsonify({"userId": user_id}),
                code,
            )

        else:
            return (
                jsonify({"error": error}),
                code,
            )


@user_bp.route("/create", methods=["POST"])
@require_api_key
def create_user_route():
    """Create a new user"""

    data = request.get_json()

    if not data:
        return (
            jsonify({"error": "Invalid request"}),
            400,
        )

    else:
        [success, code, user_id, error] = create_user(data)

        if success:
            return (
                jsonify({"userId": user_id}),
                code,
            )

        else:
            return (
                jsonify({"error": error}),
                code,
            )


@user_bp.route("/block/<int:user_id>", methods=["POST"])
@require_api_key
def block_user_route(user_id: int):
    """Block user"""

    [success, code, error] = block_user(user_id)

    if success:
        return (
            jsonify({"message": "User blocked successfully"}),
            code,
        )

    else:
        return (
            jsonify({"error": error}),
            code,
        )


@user_bp.route("/exist", methods=["GET"])
@require_api_key
def check_users_exist_route():
    """Check if there is users in DB"""

    try:
        users_exist = User.query.first() is not None

        if users_exist:
            return (
                jsonify({"exist": True}),
                200,
            )
        else:
            return (
                jsonify({"exist": False}),
                200,
            )

    except Exception as e:
        return (
            jsonify(
                {
                    "error": str(e),
                }
            ),
            500,
        )
