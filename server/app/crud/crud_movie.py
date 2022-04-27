from app.crud.base import CRUDBase
from app.models.movie import Movie
from app.schemas.movie import MovieCreate, MovieUpdate

# CRUD Movie, takes CRUDBase as parameter
class CRUDMovie(CRUDBase[Movie, MovieCreate, MovieUpdate]):
    ...


movie = CRUDMovie(Movie)
