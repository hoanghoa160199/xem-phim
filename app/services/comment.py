import pymongo
from app.model.comment import Comment
from .movie import MovieService
from .database import DatabaseConnection


class CommentService:
    def __init__(self) -> None:
        self.connect_database = DatabaseConnection.create_connection('comments')

    def create(self, data: str):
        connect = self.connect_database
        add_comment = Comment(data['userid'], data['content']).to_dict()
        connect.insert_one(add_comment)
        add_comment.pop('_id')
        return add_comment

    def delete(self, id_comment: str):
        connect = self.connect_database
        movies = MovieService().get_all_movie()
        for movie in movies:
            for com in movie['comment']:
                if id_comment == com:
                    movie['comment'].remove(id_comment)
                    MovieService().update(movie)
                    break
        result = connect.find_one_and_delete({'id': id_comment})
        result.pop('_id')
        return result

    def update(self, data: dict):
        connect = self.connect_database
        connect.find_one_and_update({'id': data['id']}, {'$set': {"content": data['content']}})
        return data

    def get_all_comment_of_user(self, id_user: str):
        connect = self.connect_database
        result = []
        for x in connect.find({"userid": id_user}, {"_id": 0}):
            result.append(x)
        return result

    def get_comments(self, id_comments: dict):
        connect = self.connect_database
        result = []
        for i in id_comments['id_comment']:
            result.append(connect.find_one({"id": i}, {"_id": 0}))
        result.reverse()
        return result
