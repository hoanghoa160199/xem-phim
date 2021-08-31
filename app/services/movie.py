import pymongo
from app.model.movie import Movie
# from app.services.category import CategoryService
# from app.services.comment import CommentService
from .database import DatabaseConnection


class MovieService:
    def __init__(self) -> None:
        self.connect_database = DatabaseConnection.create_connection('movies')

    def create(self, data: dict):
        connect = self.connect_database
        add_movie = Movie(data['name'], data['year'], data['country'], data['categories'],
                          data['seasons'], [], [], data['description'], data['image']).to_dict()
        connect.insert_one(add_movie)
        add_movie.pop('_id')
        return add_movie

    def delete(self, id_movie: str):
        connect = self.connect_database
        result = connect.find_one_and_delete({'id': id_movie})
        result.pop('_id')
        return result

    def update(self, data: dict):
        connect = self.connect_database
        connect.find_one_and_update({'id': data['id']},
                                    {'$set': {"name": data['name'], "year": data['year'],
                                              "country": data['country'], "categories": data['categories'],
                                              "seasons": data['seasons'], "vote": data['vote'],
                                              "comment": data['comment'], "description": data['description'],
                                              "image": data['image']}})
        return data

    def get_movie(self, name_movie: str):
        connect = self.connect_database
        result = []
        for x in connect.find({}, {"_id": 0}):
            result.append(x)
        if name_movie == "":
            return result
        movies = []
        for mov in result:
            if mov['name'].find(name_movie) != -1:
                movies.append(mov)
        return result

    def detail_movie(self, id_movie: str):
        return DatabaseConnection.get_movie(id_movie)

    def get_all_data_movie(self):
        return DatabaseConnection.get_all_data()

    def get_all_movie(self):
        connect = self.connect_database
        result = []
        for x in connect.find({}, {"_id": 0}):
            result.append(x)
        return result

    def get_movie_category(self, id_category: str):
        connect = self.connect_database
        result = []
        movies = []
        for x in connect.find({}, {"_id": 0}):
            result.append(x)
        for movie in result:
            if id_category in movie['categories']:
                movies.append(movie)
        return movies

    def search_movie(self, name_movie: str):
        all_data = DatabaseConnection.get_all_data()
        movies = []
        for movie in all_data:
            if movie['name'].find(name_movie) != -1:
                movies.append(movie)
        return movies