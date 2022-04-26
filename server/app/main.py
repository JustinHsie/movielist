from fastapi import FastAPI, APIRouter

from typing import Optional

MOVIES = [
    {
        "id": 1,
        "title": "Coco",
        "release_date": "2015-07-03",
    },
    {
        "id": 2,
        "title": "The Batman",
        "release_date": "2022-03-10",
    },
    {
        "id": 3,
        "title": "Dune",
        "release_date": "2021-10-23",
    },
]

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
@api_router.get("/movie/{movie_id}", status_code=200)
def fetch_movie(*, movie_id: int) -> dict:
    """
    Fetch single movie by id
    """

    # Returns movie with matching id
    for movie in MOVIES:
        if movie["id"] == movie_id:
            return movie

# Search for movie
@api_router.get("/search", status_code=200)
def search_movies(
    keyword: Optional[str] = None, max_results: Optional[int] = 10
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

# Register APIRouter api_router object with FastAPI app object
app.include_router(api_router)

# Runs in debug mode if module is called directly ie run with python
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")