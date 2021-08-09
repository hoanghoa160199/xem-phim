import uuid


class User:
    def __init__(self, username: str, password: str, type_user: int, name: str):
        self.id = uuid.uuid4()
        self.username = username
        self.password = password
        self.name = name
