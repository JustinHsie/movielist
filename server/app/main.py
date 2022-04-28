from fastapi import FastAPI, APIRouter, Request, Depends
from fastapi.templating import Jinja2Templates

from pathlib import Path
from sqlalchemy.orm import Session

from app import crud
from app.api import deps
from app.api.api_v1.api import api_router
from app.core.config import settings


BASE_PATH = Path(__file__).resolve().parent
TEMPLATES = Jinja2Templates(directory=str(BASE_PATH / "templates"))


# Instantiate FastAPI object
app = FastAPI(
    title="MovieList", openapi_url="/openapi.json"
)

# Instantiate APIRouter object
root_router = APIRouter()


@root_router.get("/", status_code=200)
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

# Register APIRouter root_router object with FastAPI app object, 
# stack with api_router from api_v1
app.include_router(api_router, prefix=settings.API_V1_STR)
app.include_router(root_router)



# Runs in debug mode if module is called directly ie run with python
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")