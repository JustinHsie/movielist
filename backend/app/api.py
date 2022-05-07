from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

router = APIRouter()

origins = [
  "http://localhost:3000",
  "localhost:3000"
]

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

@router.get("/", status_code=200)
async def root() -> dict:
  """
  Root GET
  """
  return {"msg": "Hello, World!"}

@router.get("/movies", status_code=200)
async def get_movies() -> dict:
    """
    GET movies
    """
    return {"data": movies}

@router.post("/movies", status_code=201)
async def add_movie(movie: dict) -> dict:
  """
  POST movie
  """
  movies.append(movie)
  return {"data": {"Movie Added"}}


app.include_router(router)