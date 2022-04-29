from fastapi import APIRouter

from app.api.api_v1.endpoints import movie, auth


api_router = APIRouter()
api_router.include_router(movie.router, prefix="/movies", tags=["movies"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
