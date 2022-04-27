from fastapi import FastAPI, APIRouter, Query, HTTPException, Request, Depends
from fastapi.templating import Jinja2Templates

from typing import Optional, Any
from pathlib import Path
from sqlalchemy.orm import Session

from app.schemas.movie import Movie, MovieSearchResults, MovieCreate
from app import deps
from app import crud


BASE_PATH = Path(__file__).resolve().parent
TEMPLATES = Jinja2Templates(directory=str(BASE_PATH / "templates"))


# Instantiate FastAPI object
app = FastAPI(
    title="MovieList", openapi_url="/openapi.json"
)

# Instantiate APIRouter object
api_router = APIRouter()

# GET home
@api_router.get("/", status_code=200)
def root(
    request: Request,
    db: Session = Depends(deps.get_db),
) -> dict:
    """
    Root Get
    """
    movies = crud.movie.get_multi(db=db, limit=10)
    return TEMPLATES.TemplateResponse(
        "index.html",
        {"request": request, "movies": movies},
    )


# GET movie by id
@api_router.get("/movie/{movie_id}", status_code=200, response_model=Movie)
def fetch_movie(
    *, 
    movie_id: int,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Fetch single movie by id
    """

    # Returns movie with matching id
    result = crud.movie.get(db=db, id=movie_id)
    if not result:
        # Raise exception if movie not found
        raise HTTPException(
            status_code=404, detail=f"Movie with id {movie_id} not found"
        )

    return result

# Search for movie
@api_router.get("/search", status_code=200, response_model=MovieSearchResults)
def search_movies(
    *,
    keyword: Optional[str] = Query(None, example="Dune"), 
    max_results: Optional[int] = 10,
    db: Session = Depends(deps.get_db)
) -> dict:
    """
    Search for movie based on title
    """
    movies = crud.movie.get_multi(db=db, limit=max_results)
    # If no keyword, return max_results number of results
    if not keyword:
        return {"results": movies}

    # Else return dictionary of matching results
    results = filter(lambda movie: keyword.lower() in movie.title.lower(), movies)
    
    return {"results": list(results)[:max_results]}

# POST movie
@api_router.post("/movie", status_code=201, response_model=Movie)
def create_movie(
    *, 
    movie_in: MovieCreate,
    db: Session = Depends(deps.get_db)
) -> dict:
    """
    Create new movie entry in the database
    """
    movie = crud.movie.create(db=db, obj_in=movie_in)
    return movie


# Register APIRouter api_router object with FastAPI app object
app.include_router(api_router)

# Runs in debug mode if module is called directly ie run with python
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")