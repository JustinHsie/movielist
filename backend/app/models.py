from pydantic import BaseModel
from typing import Union

"""
Movie
"""
# Movie schema
class MovieSchema(BaseModel):
  id: int
  image: str
  title: str
  rating: int
  datetime: float
  username:str

# Validate POST requests
class MovieAdd(BaseModel):
  id: int
  image: str
  title: str
  rating: int
  datetime: float
  username: str

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
  username:str


"""
User
"""
class User(BaseModel):
  username: str

class UserInDB(User):
  hashed_password: str

"""
Token
"""
class Token(BaseModel):
  access_token: str
  token_type: str
  username: str

class TokenData(BaseModel):
  username: Union[str, None] = None