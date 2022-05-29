import os
from sqlalchemy import (
  create_engine, 
  MetaData,
  Column,
  Integer,
  String,
  Float,
  Table
)
from sqlalchemy.sql import func
from databases import Database


DATABASE_URL = os.getenv("DATABASE_URL")

# SQLAlchemy
engine = create_engine(DATABASE_URL)
metadata = MetaData()

# Movie table schema
movies = Table(
    "movies",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("image", String),
    Column("title", String),
    Column("rating", Integer),
    Column("datetime", Float),
)

# databases query builder
database = Database(DATABASE_URL)

