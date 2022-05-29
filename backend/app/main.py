from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.db import engine, database, metadata
from app.api import movies


load_dotenv()

# Create db schema
metadata.create_all(engine)

# Instantiate app
app = FastAPI()

# Db startup shutdown handlers
@app.on_event("startup")
async def startup():
  await database.connect()

@app.on_event("shutdown")
async def shutdown():
  await database.disconnect()

# Instantiate router
router = APIRouter()

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


# Root get
@router.get("/", status_code=200)
async def root() -> dict:
  """
  Root GET
  """
  return {"msg": "Hello, World!"}



app.include_router(movies.router, tags=["movies"])
app.include_router(router)


if __name__ == "__main__":
  import uvicorn

  uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")