from models.users_model import User
from schemas.user_schema import UserSchema
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError
from database import db
from typing import Tuple, Optional
from schemas.response_type_schema import ResponseType


def create_user(user_data: User) -> Tuple[bool, ResponseType, int, Optional[int]]:
    """
    Create user & store it in DB
    """

    user = get_user_by_username(user_data.username)

    if user:
        return (
            False,
            {
                "error": "Duplicate entry",
                "message": "A user with this username already exists",
            },
            409,
        )

    user_schema = UserSchema()

    try:
        validated_data = user_schema.load(user_data)
    except ValidationError as err:
        return (False, {"message": "Validation error", "errors": err.messages}, 400)

    try:
        new_user = User(
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        new_user.set_password(validated_data["password"])

        db.session.add(new_user)
        db.session.flush()

        db.session.commit()

        return (True, {"message": "User created successfully"}, 201, new_user.id)

    except IntegrityError:
        db.session.rollback()
        return (
            False,
            {
                "error": "Duplicate entry",
                "message": "A user with this username already exists",
            },
            409,
        )

    except Exception as e:
        db.session.rollback()
        return (False, {"error": "Internal server error", "message": str(e)}, 500)


def get_user(user_id: str) -> Tuple[bool, ResponseType, int, Optional[User]]:
    user: Optional[User] = User.query.get(user_id)

    if user:
        return (True, {"message": "User found successfully."}, 200, user)
    else:
        return (
            False,
            {
                "message": "User not found.",
                "error": f"No user exists with the ID: {user_id}",
            },
            404,
            None,
        )


def get_user_by_username(
    username: str,
) -> Tuple[bool, ResponseType, int, Optional[User]]:
    user: Optional[User] = User.query.filter_by(username=username).first()

    if user:
        return (True, {"message": "User found successfully."}, 200, user)
    else:
        return (
            False,
            {
                "message": "User not found.",
                "error": f"No user exists with the username: {username}",
            },
            404,
            None,
        )
