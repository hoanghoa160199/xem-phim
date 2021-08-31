import uuid


class Season:
    def __init__(self, name: str, episodes: list):
        self.id = uuid.uuid4()
        self.name = name
        # list id Episode
        self.episodes = episodes

    def to_dict(self) -> dict:
        return {
            'id': str(self.id),
            'name': self.name,
            'episodes': self.episodes
        }
