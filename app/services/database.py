import pymongo
connection = pymongo.MongoClient("mongodb://localhost:27017/")["xem-phim"]


class DatabaseConnection:
    @staticmethod
    def create_connection(connection_name):
        return connection[connection_name]
