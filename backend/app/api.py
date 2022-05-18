import os
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import httpx
from dotenv import load_dotenv
load_dotenv()

# MovieDB API key
moviedb_api_key = os.environ.get('MOVIEDB_API_KEY')

app = FastAPI()

router = APIRouter()

origins = [
  "http://localhost:3000",
  "localhost:3000"
]

# Placeholder db
movies = [
    {
      "id": 'the-batman',
      "title": 'The Batman',
      "director": 'Matt Reeves'
    },
    {
      "id": 'spirited-away',
      "title": 'Spirited Away',
      "director": 'Hayao Miyazaki'
    },
    {
      "id": 'the-batman',
      "title": 'The Batman',
      "director": 'Matt Reeves'
    },
    {
      "id": 'the-batman',
      "title": 'The Batman',
      "director": 'Matt Reeves'
    },
    {
      "id": 'the-batman',
      "title": 'The Batman',
      "director": 'Matt Reeves'
    },
    {
      "id": 'the-batman',
      "title": 'The Batman',
      "director": 'Matt Reeves'
    }
  ]

# Allow cross-origin requests ie from frontend 
app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

# Root get
@router.get("/", status_code=200)
async def root() -> dict:
  """
  Root GET
  """
  return {"msg": "Hello, World!"}

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
    print(res.json())
  return {"query": query}

# Post movie
@router.post("/movies", status_code=201)
async def add_movie(movie: dict) -> dict:
  """
  POST movie
  """
  movies.append(movie)
  return {"data": {"Movie Added"}}


app.include_router(router)