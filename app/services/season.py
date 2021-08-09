import pymongo
from app.model.season import Season
from .database import DatabaseConnection


class SeasonService:
    def __init__(self) -> None:
        self.connect_database = DatabaseConnection.create_connection('seasons')
