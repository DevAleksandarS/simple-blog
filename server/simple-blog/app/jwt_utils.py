from flask_jwt_extended import JWTManager

jwt = JWTManager()


def init_jwt(app):
    """INIT JWT"""
    jwt.init_app(app)
