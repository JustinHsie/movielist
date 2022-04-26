from os import stat
from fastapi import FastAPI, APIRouter, Query

from typing import Optional

from app.schemas import Movie, MovieSearchResults, MovieCreate
from app.movie_data import MOVIES

# Instantiate FastAPI object
app = FastAPI(
    title="MovieList", openapi_url="/openapi.json"
)

# Instantiate APIRouter object
api_router = APIRouter()

# GET home
@api_router.get("/", status_code=200)
def root() -> dict:
    """
    Root Get
    """
    return {"msg": "Hello, World! This is MovieList"}

# GET movie by id
@api_router.get("/movie/{movie_id}", status_code=200, response_model=Movie)
def fetch_movie(*, movie_id: int) -> dict:
    """
    Fetch single movie by id
    """

    # Returns movie with matching id
    for movie in MOVIES:
        if movie["id"] == movie_id:
            return movie

# Search for movie
@api_router.get("/search", status_code=200, response_model=MovieSearchResults)
def search_movies(
    keyword: Optional[str] = Query(None, example="Dune"), max_results: Optional[int] = 10
) -> dict:
    """
    Search for movie based on title
    """
    # If no keyword, return max_results number of results
    if not keyword:
        return {"results": MOVIES[:max_results]}

    # Else return dictionary of matching results
    results = filter(lambda movie: keyword.lower() in movie["title"].lower(), MOVIES)
    return {"results": list(results)[:max_results]}

# POST movie
@api_router.post("/movie", status_code=201, response_model=Movie)
def create_movie(*, movie_in: MovieCreate) -> dict:
    """
    Create new movie entry
    """
    new_entry_id = len(MOVIES) + 1
    movie_entry = Movie(
        id=new_entry_id,
        title=movie_in.title,
        release_date=movie_in.release_date
    )
    MOVIES.append(movie_entry.dict())

    return movie_entry


# Register APIRouter api_router object with FastAPI app object
app.include_router(api_router)

# Runs in debug mode if module is called directly ie run with python
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")