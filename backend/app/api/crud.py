from app.api.models import MovieSchema
from app.db import movies, database

# GET
async def get(id: int):
  query = movies.select().where(movies.c.id == id)
  return await database.fetch_one(query=query)

# GET all
async def get_all():
  query = movies.select()
  return await database.fetch_all(query=query)

# POST
async def post(movie: MovieSchema):
  query = movies.insert().values(
    id=movie.id, 
    image=movie.image,
    title=movie.title, 
    rating=movie.rating, 
    datetime=movie.datetime
  )
  return await database.execute(query=query)

# PUT
async def put(id: int, rating: int):
  # Updates rating
  query = (
    movies
    .update()
    .where(movies.c.id == id)
    .values(rating=rating)
  )
  return await database.execute(query=query)

# DELETE
async def delete(id: int):
  query = movies.delete().where(movies.c.id == id)
  return await database.execute(query=query)
