from fastapi import FastAPI
from app.controller.category import category
from app.controller.episode import episode
from app.controller.season import season
from app.controller.user import user
from app.controller.comment import comment
from app.controller.movie import movie
from fastapi.middleware.cors import CORSMiddleware
home = FastAPI()

origins = [
    "http://127.0.0.1:8000",
    "http://localhost:3000",
    "http://localhost",
]
home.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

home.include_router(category)
home.include_router(episode)
home.include_router(season)
home.include_router(user)
home.include_router(comment)
home.include_router(movie)
