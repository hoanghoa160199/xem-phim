import uuid


class Episode:
    def __init__(self, name: str, link: str):
        self.id = uuid.uuid4()
        self.name = name
        self.link = link

    def to_dict(self) -> dict:
        return {
            'id': str(self.id),
            'name': self.name,
            'link': self.link
        }