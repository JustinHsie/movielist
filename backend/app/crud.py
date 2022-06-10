from fastapi import HTTPException
from app.models import MovieSchema
from app.db import movies, database

# GET
async def get(id: int, username: str):
  query = movies.select().where(movies.c.id == id and movies.c.username == username)
  return await database.fetch_one(query=query)

# GET all
async def get_all(username: str):
  query = movies.select().where(movies.c.username == username)
  return await database.fetch_all(query=query)

# POST
async def post(movie: MovieSchema):
  query = movies.insert().values(
    id=movie.id, 
    image=movie.image,
    title=movie.title, 
    rating=movie.rating, 
    datetime=movie.datetime,
    username=movie.username
  )
  try: return await database.execute(query=query)
  except: raise HTTPException(status_code=400, detail="Movie already exists")

# PUT
async def put(id: int, rating: int, username: str):
  # Updates rating
  query = (
    movies
    .update()
    .where(movies.c.id == id and movies.c.username == username)
    .values(rating=rating)
  )
  return await database.execute(query=query)

# DELETE
async def delete(id: int, username: str):
  query = movies.delete().where(movies.c.id == id and movies.c.username == username)
  return await database.execute(query=query)
