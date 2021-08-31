import pymongo
from app.model.category import Category
from app.services.movie import MovieService
from .database import DatabaseConnection


class CategoryService:
    def __init__(self) -> None:
        self.connect_database = DatabaseConnection.create_connection('categories')

    def create(self, data: dict):
        connect = self.connect_database
        category = Category(data['name']).to_dict()
        connect.insert_one(category)
        category.pop('_id')
        return category

    def delete(self, id_category: str):
        connect = self.connect_database
        movies = MovieService().get_all_movie()
        for movie in movies:
            for com in movie['categories']:
                if id_category == com:
                    movie['categories'].remove(id_category)
                    MovieService().update(movie)
                    break
        result = connect.find_one_and_delete({'id': id_category})
        result.pop('_id')
        return result

    def update(self, data: dict):
        connect = self.connect_database
        connect.find_one_and_update({'id': data['id']}, {'$set': {"name": data['name']}})
        return data

    def search(self, name_category: str):
        connect = self.connect_database
        result = []
        for x in connect.find({}, {"_id": 0}):
            result.append(x)
        result.reverse()
        if name_category == "":
            return result
        categories = []
        for category in result:
            if category['name'].find(name_category) != -1:
                categories.append(category)
        return categories

    def get_category(self, id_category: dict):
        connect = self.connect_database
        result = []
        for i in id_category['id_category']:
            result.append(connect.find_one({"id": i}, {"_id": 0}))
        result.reverse()
        return result
