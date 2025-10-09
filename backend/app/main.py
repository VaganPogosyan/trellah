from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.routers import auth_router, boards_router

app = FastAPI(title="Trellah")

# Allow local dev frontends to talk to the API without extra setup.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup() -> None:
    Base.metadata.create_all(bind=engine)


app.include_router(auth_router)
app.include_router(boards_router)


@app.get("/")
def root():
    return {"Hello": "World"}
