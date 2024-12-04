from database import db
from datetime import datetime, timezone
from sqlalchemy.dialects.postgresql import JSONB


class Blog(db.Model):
    """BLOGS TABLE"""

    __tablename__ = "blogs"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    content = db.Column(JSONB, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    is_live = db.Column(db.Boolean, default=False, nullable=False)

    def validate_content(self):
        """Validates the content JSON to ensure it has the correct structure."""
        if not isinstance(self.content, dict):
            raise ValueError("Content should be a JSON object.")

        content_type = self.content.get("type")
        content_data = self.content.get("content")

        if content_type not in ["heading", "text", "image"]:
            raise ValueError("Content type must be 'heading', 'text' or 'image'.")

        if not content_data:
            raise ValueError("Content field cannot be empty.")

        if content_type == "text" and not isinstance(content_data, str):
            raise ValueError("For type 'text', content must be a string.")

        if content_type == "image" and not isinstance(content_data, str):
            raise ValueError(
                "For type 'image', content must be a string (URL or file path)."
            )

    def set_content(self, content_data):
        """Sets the content with validation."""
        self.content = content_data
        self.validate_content()
