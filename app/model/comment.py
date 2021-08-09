import uuid
import datetime


class Comment:
    def __init__(self, userid: str, content: str):
        self.id = uuid.uuid4()
        self.userid = userid
        self.content = content
        self.time = datetime.datetime.now()
