from fastapi import APIRouter
from app.services.movie import MovieService
movie = APIRouter()
MOVIE_SERVICE = MovieService()


@movie.post("/add-movie")
async def add(data: dict):
    return MOVIE_SERVICE.create(data)


@movie.post("/update-movie")
async def update_movie(data: dict):
    return MOVIE_SERVICE.update(data)


@movie.post("/delete-movie")
async def delete_movie(id_movie: dict):
    return MOVIE_SERVICE.delete(id_movie['id'])


@movie.get("/get-movie")
async def get(name_movie: str):
    return MOVIE_SERVICE.get_movie(name_movie)


@movie.get("/detail-movie")
async def detail(id_movie: str):
    return MOVIE_SERVICE.detail_movie(id_movie)


@movie.get("/get-all-movie")
async def get_all():
    return MOVIE_SERVICE.get_all_data_movie()


@movie.get("/get-movie-category")
async def movie_category(id_category: str):
    return MOVIE_SERVICE.get_movie_category(id_category)


@movie.get("/search-movie")
async def search(name_movie: str):
    return MOVIE_SERVICE.search_movie(name_movie)
