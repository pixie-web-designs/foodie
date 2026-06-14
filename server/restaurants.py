import json
from pathlib import Path
from models import Restaurant

DATA_FILE = Path("data/restaurant.json")

def load_restaurants() -> list[dict]:
  if not DATA_FILE.exists():
    return []
  
  with open(DATA_FILE, "r", encoding="utf-8") as f:
    return json.load(f)
  
def load_restaurant(id: int) -> dict | None:
  return next((r for r in load_restaurants() if r["id"] == id), None)
