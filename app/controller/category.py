from fastapi import APIRouter
from app.services.category import CategoryService
from typing import Dict, Any
category = APIRouter()
CATEGORY_SERVICE = CategoryService()


@category.post("/add-category")
async def add(name_category: dict):
    return CATEGORY_SERVICE.create(name_category)


@category.post("/delete-category")
async def delete(id_category: Dict[Any, Any]):
    return CATEGORY_SERVICE.delete(id_category['id'])


@category.post("/update-category")
async def update(data: dict):
    return CATEGORY_SERVICE.update(data)


@category.get("/search-category")
async def search_category(name_category: str):
    return CATEGORY_SERVICE.search(name_category)


@category.post("/get-category")
async def get(id_category: dict):
    return CATEGORY_SERVICE.get_category(id_category)
