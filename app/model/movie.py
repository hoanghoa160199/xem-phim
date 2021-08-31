import uuid


class Movie:
    def __init__(self, name: str, year: int, country: str, categories: list, seasons: list, vote: list,
                 comment: list, description: str, image: str):
        self.id = uuid.uuid4()
        self.name = name
        self.year = year
        self.country = country
        # list id  Category
        self.categories = categories
        # list id  Season
        self.seasons = seasons 
        self.vote = vote or []
        # list id  Comment
        self.comment = comment or []
        self.description = description
        self.image = image

    def to_dict(self) -> dict:
        return {
            'id': str(self.id),
            'name': self.name,
            'year': self.year,
            'country': self.country,
            'categories': self.categories,
            'seasons': self.seasons,
            'vote': self.vote,
            'comment': self.comment,
            'description': self.description,
            'image': self.image
        }
