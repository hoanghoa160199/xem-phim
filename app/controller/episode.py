from fastapi import APIRouter
from app.services.episode import EpisodeService
episode = APIRouter()
EPISODE_SERVICE = EpisodeService()


@episode.post("/add-episode")
async def add_episode(data: dict):
    return EPISODE_SERVICE.create(data)


@episode.post("/delete-episode")
async def delete(id_episode: str):
    return EPISODE_SERVICE.delete(id_episode)


@episode.post("/update-episode")
async def update(data: dict):
    return EPISODE_SERVICE.update(data)


@episode.get("/get-all-episode")
async def get():
    return EPISODE_SERVICE.get_all_episodes()
