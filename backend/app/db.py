import os
from sqlalchemy import (
  ForeignKey,
  create_engine, 
  MetaData,
  Column,
  Integer,
  String,
  Float,
  Table,
)
from databases import Database

# Heroku and SQLAlchemy compatability
DATABASE_URL = os.environ.get("DATABASE_URL").replace("postgres://", "postgresql://", 1)

# SQLAlchemy
engine = create_engine(DATABASE_URL, pool_size=10, max_overflow=0)
metadata = MetaData()

# Movie table schema
# Composite primary key - movie id and username
movies = Table(
    "movies",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("image", String),
    Column("title", String),
    Column("rating", Integer),
    Column("datetime", Float),
    Column("username", String, ForeignKey("users.username"), primary_key=True),
)

# User table schema
users = Table(
  "users",
  metadata,
  Column("username", String, primary_key=True),
  Column("hashed_password", String),
)

# databases query builder
database = Database(DATABASE_URL, min_size=5, max_size=10)

