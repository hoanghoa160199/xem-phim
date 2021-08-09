import uuid


class Category:
    def __init__(self, name: str):
        self.id = uuid.uuid4()
        self.name = name

    def to_dict(self) -> dict:
        return {
            'id': str(self.id),
            'name': self.name
        }
