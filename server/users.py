import json
from pathlib import Path
from models import User

DATA_FILE = Path("data/users.json")

def load_users() -> list[dict]:
  if not DATA_FILE.exists():
    return []
  
  with open(DATA_FILE, "r") as f:
    return json.load(f)

def save_users(users: list[dict]):
  with open(DATA_FILE, "w") as f:
    json.dump(users, f, indent=2)
