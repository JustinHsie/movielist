import os

from typing import Union
from datetime import datetime, timedelta

from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer

from passlib.context import CryptContext
from jose import JWTError, jwt

from app.models import TokenData
from app.db import users, database

from dotenv import load_dotenv

load_dotenv()

# Secret key and algorithm for hashing
SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = "HS256"


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Specify url to get token, pass instance into Depends to require a token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Verify password
def verify_password(plain_password, hashed_password):
  return pwd_context.verify(plain_password, hashed_password)

# Hash password
def get_password_hash(password):
  return pwd_context.hash(password)

# Get user from db, returns user
async def get_user(username: str):
  query = users.select().where(users.c.username == username)
  return await database.fetch_one(query=query)

# Create user in db
async def create_user(username: str, password:str):
  user = await get_user(username)
  if user:
    raise HTTPException(status_code=400, detail="User already exists")
  hashed_password = get_password_hash(password)
  query = users.insert().values(
    username=username,
    hashed_password=hashed_password
  )
  await database.execute(query=query)
  return username

# Authenticate user, returns user
async def authenticate_user(username: str, password:str):
  user = await get_user(username)
  if not user:
    return False
  if not verify_password(password, user.hashed_password):
    return False
  return user

# Create access token, returns jwt
def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
  to_encode = data.copy()
  if expires_delta:
    expire = datetime.utcnow() + expires_delta
  else:
    expire = datetime.utcnow() + timedelta(days=2)
  to_encode.update({"exp": expire})
  encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
  return encoded_jwt

# Get current user, returns user
async def get_current_user(token: str = Depends(oauth2_scheme)):
  credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
  )
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username: str = payload.get("sub")
    if username is None:
      raise credentials_exception
    token_data = TokenData(username=username)
  except JWTError:
    raise credentials_exception
  user = await get_user(username=token_data.username)
  if user is None:
    raise credentials_exception
  return user