import json
from pathlib import Path
from schemas.user_schema import User

DATA_FILE = Path("data/users.json")

def load_users() -> list[dict]:
  if not DATA_FILE.exists():
    return []
  
  with open(DATA_FILE, "r") as f:
    return json.load(f)

def save_users(users: list[dict]):
  with open(DATA_FILE, "w") as f:
    json.dump(users, f, indent=2)

def get_by_email(email: str) -> dict | None:
  users = load_users()
  return next((u for u in users if u["email"].lower() == email.lower()), None)

def get_by_verification_token_hash(token_hash: str):
  users = load_users()
  return next((u for u in users if u["verification_token_hash"] == token_hash), None)

def check_user_exists(email):
  users = load_users()
  return any(u["email"] == email for u in users)

def create(user):
  users = load_users()
  users.append(user)
  save_users(users)

def update(updated_user):
  users = load_users()
  for index, user in enumerate(users):
    if user["id"] == updated_user["id"]:
      users[index] = updated_user
      save_users(users)
      return
  raise ValueError("User not found")
