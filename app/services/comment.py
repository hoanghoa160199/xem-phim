import pymongo
from app.model.comment import Comment
from .database import DatabaseConnection


class CommentService:
    def __init__(self) -> None:
        self.connect_database = DatabaseConnection.create_connection('comments')
    