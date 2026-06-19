import os
import secrets
from datetime import datetime, timezone

from fastapi import HTTPException
from fastapi.responses import JSONResponse, RedirectResponse

from schemas.auth_schema import RegisterRequest, LoginRequest
from security import security

from repositories import user_repository
from services import (email_service, captcha_service)

from config import settings

async def register(data: RegisterRequest):
  if not await captcha_service.verify_turnstile(data.turnstile_token):
    raise HTTPException(status_code=400, detail="Invalid CAPTCHA")
  
  if user_repository.check_user_exists(data.email):
    return JSONResponse(
      status_code=200,
      content={"message": "If the account can be created, you will receive an email."},
    )
  
  token = security.create_verification_token()

  user = {
    "id": secrets.token_urlsafe(16),
    "email": data.email,
    "password": security.hash_password(data.password),
    "verified": False,
    
    # Store only the token hash
    "verification_token_hash": token.hashed_token,

    # Expiration
    "verification_expires_at": token.expiry
  }

  # Create a new user and save to db
  user_repository.create(user)
  email_service.send_verification_email(data.email, token.raw_token)

  return {
    "message": (
      "Registration Successful."
      "Please verify your email."
    )
  }

async def verify(token: str):
  # Get hashed token
  token_hash = security.hash_token(token)

  # Check if user exists by comparing the hash of the provided token and the token hash stored in the db
  user = user_repository.get_by_verification_token_hash(token_hash)

  # Raise exception if there is no match
  if not user:
    raise HTTPException(status_code=400, detail="Invalid token")
  
  # Expiry check
  expires = datetime.fromisoformat(user["verification_expires_at"])
  if datetime.now(timezone.utc) > expires:
    raise HTTPException(status_code=400, detail="Token expired")

  user["verified"] = True
  user["verification_token"] = None

  user_repository.update(user)

  return RedirectResponse(url=f"{settings.FRONTEND_URL}/login")

async def login(data: LoginRequest):
  user = user_repository.get_by_email(data.email)

  # Prevent Enumeration
  if not user:
    raise HTTPException(status_code=401, detail="Invalid credentials")
  
  if not user:
    raise HTTPException(status_code=403, detail="Email not verified")
  
  if not security.verify_password(data.password, user["password"]):
    raise HTTPException(status_code=401, detail="Invalid credentials")
  
  token = security.create_access_token(user["id"])

  return {"access_token": token, "token_type": "bearer"}  
