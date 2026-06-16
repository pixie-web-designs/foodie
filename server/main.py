import os

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from schemas.auth_schema import RegisterRequest, LoginRequest
from rate_limit import limiter

from services import (
  auth_service,
  restaurant_service
)

from config import settings

load_dotenv()

app = FastAPI(title="Foodie Server")

# Middleware for prod
# origins = [
#   "https://foodie.com",
#   "https://www.foodie.com"
# ]

# app.add_middleware(
#   CORSMiddleware,
#   allow_origins=origins,
#   allow_credentials=True,
#   allow_methods=["GET, "POST", "PUT", "DELETE"],
#   allow_headers=["Authorization", "Content-Type"],
# )

ENV = os.getenv("ENV", "development")

if ENV == "development":
  origins = [settings.FRONTEND_URL]
else:
  origins = [
    "https://foodie.com",
    "https://www.foodie.com",
  ]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.state.limiter = limiter

@app.post("/register")
@limiter.limit("5/minute")
async def register(request: Request, data: RegisterRequest):
  return await auth_service.register(data)

@app.get("/verify")
async def verify(token: str):
  return await auth_service.verify(token)

@app.post("/login")
@limiter.limit("10/minute")
async def login(request: Request, data: LoginRequest):
  return await auth_service.login(data)

@app.get("/restaurants")
def get_restaurants():
  return restaurant_service.get_restaurants()

@app.get("/restaurants/{id}")
def get_restaurant(id: int):
  return restaurant_service.get_restaurant_by_id(id)
