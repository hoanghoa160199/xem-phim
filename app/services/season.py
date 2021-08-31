import pymongo
from app.model.season import Season
from .movie import MovieService
from .database import DatabaseConnection


class SeasonService:
    def __init__(self) -> None:
        self.connect_database = DatabaseConnection.create_connection('seasons')

    def create(self, data: dict):
        connect = self.connect_database
        add_season = Season(data['name'], data['episodes']).to_dict()
        connect.insert_one(add_season)
        add_season.pop('_id')
        return add_season

    def delete(self, id_season: str):
        connect = self.connect_database
        movies = MovieService().get_all_movie()
        for movie in movies:
            for com in movie['seasons']:
                if id_season == com:
                    movie['seasons'].remove(id_season)
                    MovieService().update(movie)
                    break
        result = connect.find_one_and_delete({'id': id_season})
        result.pop('_id')
        return result

    def update(self, data: dict):
        connect = self.connect_database
        connect.find_one_and_update({'id': data['id']}, {'$set': {"name": data['name'], "episodes": data['episodes']}})
        return data

