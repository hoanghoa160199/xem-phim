import uuid


class Movie:
    def __init__(self, name: str, year: int, country: str, categories: list, seasons: list, vote: list,
                 comment: list, description: str, image: str, type: str):
        self.id = uuid.uuid4()
        self.name = name
        self.year = year
        self.country = country
        # list id  Category
        self.categories = categories
        # list id  Season
        self.seasons = seasons
        self.vote = vote
        # list id  Comment
        self.comment = comment
        self.description = description
        self.image = image
        self.type = type
