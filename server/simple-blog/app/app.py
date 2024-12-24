from flask import Flask
from flask_cors import CORS
from database import init_db
from jwt_utils import init_jwt
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from routes.blog_routes import blog_bp
from config import Config
import os

app = Flask(__name__)
cors = CORS(
    app,
    resources={
        r"/*": {
            "origins": os.getenv("CLIENT_URL"),
            "allow_headers": ["Authorization", "Content-Type", "X-Requested-With"],
        }
    },
    supports_credentials=True,
)

# Set APP config
app.config.from_object(Config)

# Initialize database
init_db(app)

# Initialize JWT
init_jwt(app)


@app.route("/", methods=["GET"])
def default():
    return "<h1>Welcome to Simple Blog BE</h1>"


app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(user_bp, url_prefix="/users")
app.register_blueprint(blog_bp, url_prefix="/blogs")

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=app.config["DEBUG"], port=8000)
