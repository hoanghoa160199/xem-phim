import uuid
import datetime


class Comment:
    def __init__(self, userid: str, content: str):
        self.id = uuid.uuid4()
        self.userid = userid
        self.content = content
        self.time = datetime.datetime.now()

    def to_dict(self) -> dict:
        return {
            'id': str(self.id),
            'userid': self.userid,
            'content': self.content,
            'time': self.time
        }
