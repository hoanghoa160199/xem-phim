import pymongo
from app.model.category import Category
from .database import DatabaseConnection


class CategoryService:
    def __init__(self) -> None:
        self.connect_database = DatabaseConnection.create_connection('categories')

    def create(self, name_category: str):
        connect = self.connect_database
        category = Category(name_category).to_dict()
        connect.insert_one(category)
        category.pop('_id')
        return category

    def delete(self, id_category: str):
        connect = self.connect_database
        result = connect.find_one_and_delete({'id': id_category})
        result.pop('_id')
        return result

    def update(self, data: dict):
        connect = self.connect_database
        connect.find_one_and_update({'id': data['id']}, {'$set': {"name": data['name']}})
        return data

    def get_all_category(self):
        connect = self.connect_database
        result = []
        for x in connect.find({}, {"_id": 0}):
            result.append(x)
        return result
