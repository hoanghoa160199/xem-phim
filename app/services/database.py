import pymongo
connection = pymongo.MongoClient("mongodb://localhost:27017/")["xem-phim"]


class DatabaseConnection:
    @staticmethod
    def create_connection(connection_name):
        return connection[connection_name]

    def get_all_data():
        movie_connection = connection['movies']
        category_connection = connection['categories']
        comment_connection = connection['comments']
        result = []
        for movie in movie_connection.find({}, {"_id": 0}):
            categories = []
            comments = []
            for category in movie['categories']:
                categories.append(category_connection.find_one({"id": category}, {"_id": 0}))
            for comment in movie['comment']:
                comments.append(comment_connection.find_one({"id": comment}, {"_id": 0}))
            movie['categories'] = categories
            movie['comment'] = comments
            result.append(movie)
        return result

    def get_movie(id):
        movie_connection = connection['movies']
        category_connection = connection['categories']
        comment_connection = connection['comments']
        result = movie_connection.find_one({"id": id}, {"_id": 0})
        results = []
        for movie in movie_connection.find({}, {"_id": 0}):
            if movie['id'] != result['id']:
                results.append(movie)
        categories = []
        comments = []
        recommends = []
        for category in result['categories']:
            categories.append(category_connection.find_one({"id": category}, {"_id": 0}))
        for comment in result['comment']:
            comments.append(comment_connection.find_one({"id": comment}, {"_id": 0}))
        for movie in results:
            if result['categories'][0] in movie['categories']:
                recommends.append(movie)
        result['categories'] = categories
        result['comment'] = comments
        result['recommends'] = recommends
        return result
