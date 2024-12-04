from flask import Blueprint, jsonify, abort
from models.blogs_model import Blog
from decorators.api_decorator import require_api_key

blog_bp = Blueprint("blogs", __name__)


@blog_bp.route("/<int:blog_id>", methods=["GET"])
@require_api_key
def get(blog_id):
    """Get blog by ID"""

    blog = Blog.query.get(blog_id)

    if not blog:
        return False

    return jsonify(
        {
            "id": blog.id,
            "title": blog.title,
            "author": blog.author,
            "created_at": blog.created_at.isoformat(),
            "content": blog.content,
            "is_live": blog.is_live,
        }
    )
