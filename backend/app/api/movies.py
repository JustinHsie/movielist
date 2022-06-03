import os
from typing import List
from fastapi import APIRouter, HTTPException
import httpx
from app import crud
from app.models import MovieSchema, MovieAdd, MovieUpdate, MovieDelete
from dotenv import load_dotenv


# MovieDB API key
load_dotenv()
MOVIEDB_API_KEY = os.environ.get('MOVIEDB_API_KEY')

router = APIRouter()

# Get homepage movies
@router.get("/movies", response_model=List[MovieSchema], status_code=200)
async def get_movies() -> dict:
    """
    GET movies
    """
    res = await crud.get_all()
    return res

# Get search page
@router.get("/search/", status_code=200)
async def search_movie(query: str) -> dict:
  """
  Search movie
  """

  # Make API call to TheMovieDB
  async with httpx.AsyncClient() as client:
    res = await client.get(f'https://api.themoviedb.org/3/search/movie?api_key={MOVIEDB_API_KEY}&language=en-US&query={query}&page=1&include_adult=false')
  
  return {"query": res.json()}

# Post movie
@router.post("/movies", response_model=MovieSchema, status_code=201)
async def add_movie(movie: MovieAdd) -> dict:
  """
  POST movie
  """
  await crud.post(movie)

  entry = {
    "id": movie.id,
    "image": movie.image,
    "title": movie.title,
    "rating": movie.rating,
    "datetime": movie.datetime
  }

  return entry

# Put movie
@router.put("/movies", status_code=201)
async def update_movie(movie: MovieUpdate) -> dict:
  """
  PUT movie
  """
  movieDb = await crud.get(movie.id)
  if not movieDb:
    raise HTTPException(status_code=404, detail='Movie not found')

  await crud.put(movie.id, movie.rating)

  res = {
    "id": movie.id,
    "rating": movie.rating
  }
  return res

# Delete movie
@router.delete("/movies", status_code=200)
async def delete_movie(movie: MovieDelete) -> dict:
  """
  DELETE movie
  """
  movieDb = await crud.get(movie.id)
  if not movieDb:
    raise HTTPException(status_code=404, detail='Movie not found')

  await crud.delete(movie.id)

  res = {
    "id": movie.id
  }
  return res