import bcrypt
from database import db


class User(db.Model):
    """USERS TABLE"""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, plain_password):
        """Hashes the password using bcrypt and stores it."""
        self.password_hash = bcrypt.hashpw(
            plain_password.encode("utf-8"), bcrypt.gensalt()
        ).decode("utf-8")

    def check_password(self, plain_password):
        """
        Verifies the password by comparing the stored hash with the provided password.
        """
        return bcrypt.checkpw(
            plain_password.encode("utf-8"), self.password_hash.encode("utf-8")
        )
