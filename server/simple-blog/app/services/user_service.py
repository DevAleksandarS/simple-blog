from models.users_model import User
from schemas.user_schema import UserSchema
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError
from database import db
from typing import Tuple, Optional


def create_admin(
    user_data: UserSchema,
) -> Tuple[bool, int, Optional[int], Optional[str]]:
    """
    Checks if the system already has a user; otherwise, validates the provided data and creates the first user as an admin.

    Parameters:
        - user_data: object containing user info

    Returns:
        - Success status (bool)
        - HTTP status code (int)
        - User ID (int) if successful, otherwise None
        - Error message (str) if an error occurred, otherwise None
    """

    if User.query.first() is not None:
        return (False, 403, None, "Admin creation restricted")

    user_schema = UserSchema()

    try:
        validated_data = user_schema.load(user_data)
    except ValidationError as err:
        return (False, 400, None, err.messages)

    try:
        new_user = User(
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            admin=True,
        )
        new_user.set_password(validated_data["password"])

        db.session.add(new_user)
        db.session.flush()

        db.session.commit()

        return (True, 201, new_user.id, None)

    except IntegrityError:
        db.session.rollback()
        return (False, 409, None, "Duplicate entry")

    except Exception as err:
        db.session.rollback()
        return (False, 400, None, str(err))


def create_user(user_data: UserSchema) -> Tuple[bool, int, Optional[int], str]:
    """
    Checks if username provided already exists, validates data and creates user.

    Parameters:
        - user_data: object containing user info

    Returns:
        - Success status (bool)
        - HTTP status code (int)
        - User ID (int) if successful, otherwise None
        - Error message (str) if an error occurred, otherwise None
    """

    if User.query.first() is None:
        return (
            False,
            403,
            None,
            "Cannot create user because there are no existing users in the system",
        )

    [_, _, user, _] = get_user_by_username(user_data["username"])

    if user:
        return (False, 409, None, "Duplicate entry")

    user_schema = UserSchema()

    try:
        validated_data = user_schema.load(user_data)
    except ValidationError as err:
        return (False, 400, None, err.messages)

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

        return (True, 201, new_user.id, None)

    except IntegrityError:
        db.session.rollback()
        return (False, 409, None, "Duplicate entry")

    except Exception as err:
        db.session.rollback()
        return (False, 500, None, str(err))


def get_user(user_id: str) -> Tuple[bool, int, Optional[User], Optional[str]]:
    """
    Get user by their User ID.

    Parameters:
        - user_id: ID of the user to retrieve

    Returns:
        - Success status (bool)
        - HTTP status code (int)
        - User data (User) if successful, otherwise None
        - Error message (str) if an error occurred, otherwise None
    """

    try:
        user: Optional[User] = User.query.get(user_id)

        if user:
            return (True, 200, user, None)
        else:
            return (False, 404, None, f"No user exists with the ID: {user_id}")

    except Exception as err:
        return (False, 500, None, str(err))


def get_user_by_username(
    username: str,
) -> Tuple[bool, int, Optional[User], Optional[str]]:
    """
    Get user by their username.

    Parameters:
        - username: username of the user to retrieve

    Returns:
        - Success status (bool)
        - HTTP status code (int)
        - User data (User) if successful, otherwise None
        - Error message (str) if an error occurred, otherwise None
    """

    try:
        user: Optional[User] = User.query.filter_by(username=username).first()

        if user:
            return (True, 200, user, None)
        else:
            return (False, 404, None, f"No user exists with the username: {username}")

    except Exception as err:
        return (False, 500, None, str(err))


def block_user(user_id: int) -> Tuple[bool, int, str]:
    """
    Block user based on his ID.

    Parameters:
        - user_id: ID of the user to block

    Returns:
        - Success status (bool)
        - HTTP status code (int)
        - Error message (str) if an error occurred, otherwise None
    """

    try:
        user = User.query.get(user_id)

        if not user:
            return (False, 404, f"No user exists with the ID: {user_id}")

        user.blocked = True
        db.session.commit()

        return (True, 200, None)

    except Exception as err:
        db.session.rollback()
        return (False, 404, str(err))
