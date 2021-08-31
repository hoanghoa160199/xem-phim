from fastapi import APIRouter
from app.services.comment import CommentService

comment = APIRouter()
COMMENT_SERVICE = CommentService()


@comment.post("/add-comment")
async def add(data: dict):
    return COMMENT_SERVICE.create(data)


@comment.post("/delete-comment")
async def delete(id_comment: str):
    return COMMENT_SERVICE.delete(id_comment)


@comment.post("/update-comment")
async def update(data: dict):
    return COMMENT_SERVICE.update(data)


@comment.post("/get-comments")
async def get(id_comment: dict):
    return COMMENT_SERVICE.get_comments(id_comment)
