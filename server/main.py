import os
import secrets
from datetime import datetime, timedelta, timezone

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

from models import RegisterRequest, LoginRequest
from rate_limit import limiter
from security import (
  hash_password,
  verify_password,
  hash_token,
  create_access_token
)

from users import load_users, save_users
from email_service import send_verification_email
from restaurants import load_restaurants, load_restaurant

load_dotenv()

app = FastAPI(title="Foodie Server")

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.state.limiter = limiter

#Captcha
async def verify_turnstile(token: str) -> bool:
  async with httpx.AsyncClient() as client:
    res = await client.post(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      data={
        "secret": os.getenv("TURNSTILE_SECRET"),
        "response": token,
      },
    )
    return res.json().get("success", False)

@app.post("/register")
@limiter.limit("5/minutes")
async def register(data: RegisterRequest, captcha_token: str):

  if not await verify_turnstile(captcha_token):
    raise HTTPException(status_code=400, detail="Invalid CAPTCHA")

  users = load_users()
  
  if any(u["email"] == data.email for u in users):
    return JSONResponse(
      status_code=200,
      content={"message": "If the account can be created, you will receive an email."},
    )
  
  raw_token = secrets.token_urlsafe(32)

  user = {
    "id": secrets.token_urlsafe(16),
    "email": data.email,
    "password": hash_password(data.password),
    "verified": False,
    
    # Store only the token hash
    "verification_token_hash": hash_token(raw_token),

    # Expiration
    "verification_expires_at": (
      datetime.now(timezone.utc) + timedelta(hours=24)
    ).isoformat()
  }

  users.append(user)
  save_users(users)

  send_verification_email(data.email, raw_token)

  return {
    "message": (
      "Registration Successful."
      "Please verify your email."
    )
  }

@app.get("/verify")
def verify(token: str):
  users = load_users()

  # Get hashed token
  token_hashed = hash_token(token)

  # Check if user exists by comparing the hash of the provided token and the token hash stored in the db
  user = next((u for u in users if u["verification_token_hash"] == token_hashed), None)

  # Raise exception if there is no match
  if not user:
    raise HTTPException(status_code=400, detail="Invalid token")
  
  # Expiry check
  expires = datetime.fromisoformat(user["verification_expires_at"])
  if datetime.now(timezone.utc) > expires:
    raise HTTPException(status_code=400, detail="Token expired")

  user["verified"] = True
  user["verification_token"] = None

  save_users(users)

  return RedirectResponse(url=f"{os.getenv("FRONTEND_URL")}/login")

@app.post("/login")
@limiter.limit("10/minute")
def login(data: LoginRequest):
  users = load_users()
  user = next((u for u in users if u["email"] == data.email), None)

  # Prevent Enumeration
  if not user:
    raise HTTPException(status_code=401, detail="Invalid credentials")
  
  if not user:
    raise HTTPException(status_code=403, detail="Email not verified")
  
  if not verify_password(data.password, user["password"]):
    raise HTTPException(status_code=401, detail="Invalid credentials")
  
  token = create_access_token(user["id"])

  return {"access_token": token, "token_type": "bearer"}


@app.get("/restaurants")
def get_restaurants():
  return load_restaurants()

@app.get("/restaurants/{id}")
def get_restaurant(id: int):
  restaurant = load_restaurant(id)

  if restaurant is None:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Restaurant with id {id} not found")

  return restaurant

