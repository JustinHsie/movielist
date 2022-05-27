import os
from fastapi import APIRouter
import httpx
from dotenv import load_dotenv


# MovieDB API key
load_dotenv()
moviedb_api_key = os.environ.get('MOVIEDB_API_KEY')

router = APIRouter()

# Mock db
movies = [
    {
      "id": 1,
      "title": 'The Batman',
      "rating": 8,
      "datetime": 1
    },
    {
      "id": 2,
      "title": 'Spirited Away',
      "rating": 10,
      "datetime": 0
    }
  ]

# Get homepage
@router.get("/movies", status_code=200)
async def get_movies() -> dict:
    """
    GET movies
    """
    return {"data": movies}

# Get search page
@router.get("/search/", status_code=200)
async def search_movie(query: str) -> dict:
  """
  Search movie
  """

  # Make API call to TheMovieDB
  async with httpx.AsyncClient() as client:
    res = await client.get(f'https://api.themoviedb.org/3/search/movie?api_key={moviedb_api_key}&language=en-US&query={query}&page=1&include_adult=false')
  
  return {"query": res.json()}

# Post movie
@router.post("/movies", status_code=201)
async def add_movie(movie: dict) -> dict:
  """
  POST movie
  """
  movies.append(movie)
  return {"data": {"Movie Added"}}

# Put movie
@router.put("/movies", status_code=201)
async def update_movie(movie: dict) -> dict:
  """
  PUT movie
  """
  for dbMovie in movies:
    if dbMovie['id'] == movie['id']:
      # Update movie rating
      dbMovie['rating'] = movie['rating']
      break
  return {"data": {"Movie updated"}}

# Delete movie
@router.delete("/movies", status_code=200)
async def delete_movie(movie: dict) -> dict:
  """
  DELETE movie
  """
  # Delete movie
  movies[:] = [dbMovie for dbMovie in movies if dbMovie['id'] != movie['id']]
  return {"data": {"Movie deleted"}}