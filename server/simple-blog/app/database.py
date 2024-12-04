from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def init_db(app):
    """INIT DB"""
    db.init_app(app)
    with app.app_context():
        try:
            db.create_all()
            print("Database tables created.")
        except Exception as e:
            print(f"Error initializing the database: {e}")
            raise
