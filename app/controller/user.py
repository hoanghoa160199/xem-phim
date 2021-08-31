from fastapi import APIRouter
from app.services.user import UserService
user = APIRouter()
USER_SERVICE = UserService()


@user.post("/add-user")
async def add(data: dict):
    return USER_SERVICE.create(data)


@user.post("/delete-user")
async def delete(id_user: str):
    return USER_SERVICE.delete(id_user)


@user.post("/update-user")
async def update(data: dict):
    return USER_SERVICE.update(data)


@user.get("/get-user")
async def get(name_user: str):
    return USER_SERVICE.search(name_user)
