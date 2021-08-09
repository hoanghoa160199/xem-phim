import pymongo
from app.model.movie import Movie
from .database import DatabaseConnection


class EpisodeService:
    def __init__(self) -> None:
        self.connect_database = DatabaseConnection.create_connection('movies')
