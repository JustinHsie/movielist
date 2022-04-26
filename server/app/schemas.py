from pydantic import BaseModel

from typing import Sequence


class Movie(BaseModel):
  id: int
  title: str
  release_date: str

class MovieSearchResults(BaseModel):
  results: Sequence[Movie]

class MovieCreate(BaseModel):
  title: str
  release_date: str
  submitter_id: int