from typing import Union
from datetime import datetime, timedelta

from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
import os
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import JWTError, jwt

from app.db import engine, database, metadata
from app.api import movies, auth


# Create db schema
metadata.create_all(engine)


# Instantiate app
app = FastAPI()

# Instantiate router
router = APIRouter()


# Root get
@router.get("/", status_code=200)
async def root():
  """
  Root GET
  """
  return {"Hello, World!"}


# Db startup shutdown handlers
@app.on_event("startup")
async def startup():
  await database.connect()

@app.on_event("shutdown")
async def shutdown():
  await database.disconnect()


# Origins
origins = [
  "http://localhost:3000",
  "localhost:3000"
]


# BACKEND_CORS_ORIGINS is a JSON-formatted list of origins
# e.g: '["http://localhost", "http://localhost:4200", "http://localhost:3000", \
# "http://localhost:8080",'
BACKEND_CORS_ORIGINS = [
        "http://localhost:3000",
        "http://localhost:8001",
        "http://movielist.herokuapp.com",
        ]

# Set all CORS enabled origins
if BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


app.include_router(auth.router, tags=["auth"])
app.include_router(movies.router, tags=["movies"])
app.include_router(router)


if __name__ == "__main__":
  import uvicorn

  uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")