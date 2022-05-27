from pydantic import BaseModel

# To validate POST PUT requests
class MovieSchema(BaseModel):
  id: int
  image: str
  title: str
  rating: int
  datetime: int