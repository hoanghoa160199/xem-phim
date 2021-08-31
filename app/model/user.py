import uuid


class User:
    def __init__(self, username: str, password: str, name: str):
        self.id = uuid.uuid4()
        self.username = username
        self.password = password
        self.name = name

    def to_dict(self) -> dict:
        return {
            'id': str(self.id),
            'username': self.username,
            'password': self.password,
            'name': self.name
        }
