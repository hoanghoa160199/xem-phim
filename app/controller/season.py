from fastapi import APIRouter
from app.services.season import SeasonService

season = APIRouter()
SEASON_SERVICE = SeasonService()


@season.post("/add-season")
async def add_season(data: dict):
    return SEASON_SERVICE.create(data)


@season.post("/delete-season")
async def delete(id_season: str):
    return SEASON_SERVICE.delete(id_season)


@season.post("/update-season")
async def update(data: dict):
    return SEASON_SERVICE.update(data)


