from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers import price

app = FastAPI(title="Market Data API", version="1.0")

origins = [
    "http://localhost:5173",
    "https://leolazare.netlify.app",
    "https://leolazare.fr"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy"}

app.include_router(price.router)