import pymongo
from app.model.user import User
from .database import DatabaseConnection


class UserService:
    def __init__(self) -> None:
        self.connect_database = DatabaseConnection.create_connection('users')
