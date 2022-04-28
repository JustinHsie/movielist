from fastapi import APIRouter

from app.api.api_v1.endpoints import movie


api_router = APIRouter()
api_router.include_router(movie.router, prefix="/movies", tags=["movies"])
