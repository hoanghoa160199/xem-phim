import pymongo
from app.model.user import User
from .comment import CommentService
from .database import DatabaseConnection

COM = CommentService()


class UserService:
    def __init__(self) -> None:
        self.connect_database = DatabaseConnection.create_connection('users')

    def create(self, data: dict):
        connect = self.connect_database
        add_user = User(data['username'], data['password'], data['name']).to_dict()
        user_duplicate = USERSERVICE.search(data['name'])
        if len(user_duplicate) != 0:
            return {"result": "duplicate"}
        connect.insert_one(add_user)
        add_user.pop('_id')
        return add_user

    def delete(self, id_user: str):
        connect = self.connect_database
        comments = COM.get_all_comment_of_user(id_user)
        for comment in comments:
            COM.delete(comment['id'])
        result = connect.find_one_and_delete({'id': id_user})
        result.pop('_id')
        return result

    def update(self, data: dict):
        connect = self.connect_database
        connect.find_one_and_update({'id': data['id']},
                                    {'$set': {"name": data['name'],
                                              "username": data['username'],
                                              "password": data['password']}})
        return data

    def search(self, name: str):
        connect = self.connect_database
        result = []
        if name == "":
            for x in connect.find({}, {"_id": 0}):
                result.append(x)
            return result
        for x in connect.find({"name": name}, {"_id": 0}):
            result.append(x)
        return result

    def check(self, data: dict):
        connect = self.connect_database
        result = []
        for x in connect.find({"name": data['name']}, {"_id": 0}):
            result.append(x)
        return result


USERSERVICE = UserService()
