import asyncio
from typing import Any, Optional

import httpx
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import crud
from app.api import deps
from app.schemas.movie import Movie, MovieCreate, MovieSearchResults

router = APIRouter()
RECIPE_SUBREDDITS = ["recipes", "easyrecipes", "TopSecretRecipes"]


@router.get("/{movie_id}", status_code=200, response_model=Movie)
def fetch_movie(
    *,
    movie_id: int,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Fetch a single movie by id
    """
    result = crud.movie.get(db=db, id=movie_id)
    if not result:
        # the exception is raised, not returned - you will get a validation
        # error otherwise.
        raise HTTPException(
            status_code=404, detail=f"Movie with ID {movie_id} not found"
        )

    return result


@router.get("/search/", status_code=200, response_model=MovieSearchResults)
def search_movies(
    *,
    keyword: Optional[str] = Query(None, min_length=2, example="Dune"),
    max_results: Optional[int] = 10,
    db: Session = Depends(deps.get_db),
) -> dict:
    """
    Search for movies based on title keyword
    """
    movies = crud.movie.get_multi(db=db, limit=max_results)
    if not keyword:
        return {"results": movies}

    results = filter(lambda movie: keyword.lower() in movie.title.lower(), movies)
    return {"results": list(results)[:max_results]}


@router.post("/", status_code=201, response_model=Movie)
def create_movie(
    *, movie_in: MovieCreate, db: Session = Depends(deps.get_db)
) -> dict:
    """
    Create a new movie in the database.
    """
    movie = crud.movie.create(db=db, obj_in=movie_in)

    return movie


async def get_reddit_top(subreddit: str) -> list:
    """
    Return top reddit posts
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://www.reddit.com/r/{subreddit}/top.json?sort=top&t=day&limit=5",
            headers={"User-agent": "recipe bot 0.1"},
        )

    subreddit_recipes = response.json()
    subreddit_data = []
    for entry in subreddit_recipes["data"]["children"]:
        score = entry["data"]["score"]
        title = entry["data"]["title"]
        link = entry["data"]["url"]
        subreddit_data.append(f"{str(score)}: {title} ({link})")
    return subreddit_data

@router.get("/ideas/async")
async def fetch_ideas_async() -> dict:
    results = await asyncio.gather(
        *[get_reddit_top(subreddit=subreddit) for subreddit in RECIPE_SUBREDDITS]
    )
    return dict(zip(RECIPE_SUBREDDITS, results))
