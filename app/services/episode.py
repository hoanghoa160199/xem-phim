import pymongo
from app.model.episode import Episode
from .season import SeasonService
from .database import DatabaseConnection


class EpisodeService:
    def __init__(self) -> None:
        self.connect_database = DatabaseConnection.create_connection('episodes')

    def create(self, data: dict):
        connect = self.connect_database
        episode = Episode(data['name'], data['link']).to_dict()
        connect.insert_one(episode)
        episode.pop('_id')
        return episode

    def delete(self, id_episode: str):
        connect = self.connect_database
        delete_id_in_season = SeasonService().get_all_season_of_movie()
        for i in delete_id_in_season:
            for delete_id in i['episodes']:
                if delete_id == id_episode:
                    i['episodes'].remove(delete_id)
                    SeasonService().update(i)
                    break
        result = connect.find_one_and_delete({'id': id_episode})
        result.pop('_id')
        return result

    def update(self, data: dict):
        connect = self.connect_database
        connect.find_one_and_update({'id': data['id']}, {'$set': {"name": data['name'], "link": data['link']}})
        return data

    def get_all_episodes(self):
        connect = self.connect_database
        result = []
        for x in connect.find({}, {"_id": 0}):
            result.append(x)
        return result
