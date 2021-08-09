from fastapi import FastAPI
from app.controller.category import category
from app.controller.episode import episode
home = FastAPI()


home.include_router(category)
home.include_router(episode)
