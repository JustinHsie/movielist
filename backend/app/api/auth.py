from datetime import timedelta

from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm

from app.models import Token, User
from app.security import (
  authenticate_user, 
  create_access_token, 
  get_current_user,
  create_user
)


ACCESS_TOKEN_EXPIRE_DAYS = 2

router = APIRouter()

# Sign up and create user
@router.post("/signup")
async def signup(form_data: OAuth2PasswordRequestForm = Depends()):
  user = await create_user(form_data.username, form_data.password)
  # Login after signup
  access_token_expires = timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
  access_token = create_access_token(
    data={"sub": form_data.username}, expires_delta=access_token_expires
  )
  return {"access_token": access_token, "token_type": "bearer", "username": form_data.username}

# Login to get token, returns JSON with jwt
@router.post("/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
  user = await authenticate_user(form_data.username, form_data.password)
  if not user:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="Incorrect username or password",
      headers={"WWW-Authenticate": "Bearer"},
    )
  access_token_expires = timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
  access_token = create_access_token(
    data={"sub": user.username}, expires_delta=access_token_expires
  )
  return {"access_token": access_token, "token_type": "bearer", "username": form_data.username}


# Gets user, returns as User schema
@router.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
  return current_user