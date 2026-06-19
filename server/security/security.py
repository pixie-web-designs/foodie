import os
import secrets
import hashlib
from datetime import datetime, timedelta, timezone

from jose import jwt
from pwdlib import PasswordHash

class Token:
  def __init__(self, raw_token: str, hashed_token: str, expiry: str):
    self.raw_token = raw_token
    self.hashed_token = hashed_token
    self.expiry = expiry

# Password hash algorithm
password_hash = PasswordHash.recommended()

# Sign tokens to prevent forgery
JWT_SECRET = os.getenv("JWT_DEV_SECRET", "JWT_FALLBACK_SECRET") # Remove fallback for prod

# Algorithm for signing JWTs
JWT_ALGORITHM = "HS256"

# Create verification token
def create_verification_token():
  raw_token = secrets.token_urlsafe(32)
  hashed_token = hash_token(raw_token)
  expiry = (datetime.now(timezone.utc) + timedelta(hours=24)).isoformat()
  return Token(raw_token, hashed_token, expiry)

# Hash plain text and store it
def hash_password(password: str) -> str:
  return password_hash.hash(password)

# Verify entered password with stored hash
def verify_password(password: str, hashed: str) -> bool:
  return password_hash.verify(password, hashed)

# Hash verification token and store it
def hash_token(token: str) -> str:
  return hashlib.sha256(token.encode()).hexdigest()

# Create signed JWT access token for authenticated sessions with expiry
def create_access_token(user_id: str):
  payload = {
    "sub": user_id,
    "exp": datetime.now(timezone.utc) + timedelta(hours=2),
  }
  return jwt.encode(
    payload,
    JWT_SECRET,
    algorithm=JWT_ALGORITHM
  )
