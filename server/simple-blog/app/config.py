from dotenv import load_dotenv
import os

load_dotenv()


class Config:
    API_SECRET_KEY = os.getenv("API_SECRET_KEY")
    if not API_SECRET_KEY:
        raise ValueError("API_SECRET_KEY is not set in the environment")

    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    if not JWT_SECRET_KEY:
        raise ValueError("JWT_SECRET_KEY is not set in the environment")

    POSTGRES_USER = os.getenv("POSTGRES_USER")
    if not POSTGRES_USER:
        raise ValueError("POSTGRES_USER is not set in the environment")

    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
    if not POSTGRES_PASSWORD:
        raise ValueError("POSTGRES_PASSWORD is not set in the environment")

    POSTGRES_HOST = os.getenv("POSTGRES_HOST", "db")
    POSTGRES_DB = os.getenv("POSTGRES_DB", "simple-blog")

    SQLALCHEMY_DATABASE_URI = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:5432/{POSTGRES_DB}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = os.getenv("FLASK_DEBUG", "false").lower() == "true"
