from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

router = APIRouter()

origins = [
  "http://localhost3000",
  "localhost3000"
]

# Allow cross-origin requests ie from frontend 
app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

@router.get("/", status_code=200)
async def root() -> dict:
  """
  Root GET
  """
  return {"msg": "Hello, World!"}

app.include_router(router)