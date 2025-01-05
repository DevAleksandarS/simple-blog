from flask import Blueprint, request, jsonify
from decorators.api_decorator import require_api_key
from services.user_service import get_user_by_username
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
    unset_jwt_cookies,
    get_jwt_identity,
    jwt_required,
)

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

    response = jsonify(
        {
            "id": user.id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
        }
    )

    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)

    return (
        response,
        200,
    )


@auth_bp.route("/logout", methods=["POST"])
def logout():
    resp = jsonify({"logout": True})
    unset_jwt_cookies(resp)
    return resp, 200


@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    username = get_jwt_identity()
    access_token = create_access_token(identity=username)

    resp = jsonify({"refresh": True})
    set_access_cookies(resp, access_token)
    return resp, 200


@auth_bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    username = get_jwt_identity()
    return jsonify({"username": username}), 200
