from pydantic import BaseModel

# Movie schema
class MovieSchema(BaseModel):
  id: int
  image: str
  title: str
  rating: int
  datetime: float

# Validate POST requests
class MovieAdd(BaseModel):
  id: int
  image: str
  title: str
  rating: int
  datetime: float

# Validate PUT requests
class MovieUpdate(BaseModel):
  id: int
  rating: int

# Validate DELETE requests
class MovieDelete(BaseModel):
  id: int

# Create new movie
class MovieCreate(BaseModel):
  id: int
  image: str
  title: str
  rating: int
  datetime: float