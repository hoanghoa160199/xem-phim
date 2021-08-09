from fastapi import APIRouter
from app.services.category import CategoryService
category = APIRouter()
CATEGORY_SERVICE = CategoryService()


@category.post("/add-category")
async def add(name_category: str):
    return CATEGORY_SERVICE.create(name_category)


@category.post("/delete-category")
async def delete(id_category: str):
    return CATEGORY_SERVICE.delete(id_category)


@category.post("/update-category")
async def update(data: dict):
    return CATEGORY_SERVICE.update(data)


@category.get("/get-all-category")
async def get():
    return CATEGORY_SERVICE.get_all_category()
