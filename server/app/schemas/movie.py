from pydantic import BaseModel

from typing import Sequence


class MovieBase(BaseModel):
    title: str
    release_date: str


class MovieCreate(MovieBase):
    title: str
    release_date: str
    submitter_id: int


class MovieUpdate(MovieBase):
    title: str


# Properties shared by models stored in DB
class MovieInDBBase(MovieBase):
    id: int
    submitter_id: int

    class Config:
        orm_mode = True


# Properties to return to client
class Movie(MovieInDBBase):
    pass


# Properties properties stored in DB
class MovieInDB(MovieInDBBase):
    pass


class MovieSearchResults(BaseModel):
    results: Sequence[Movie]
