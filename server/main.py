from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path
from typing import Any

app = FastAPI(title="Foodie Server")

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# Establish path to JSON data
script_dir = Path(__file__).parent
data_path = script_dir / "data"
data_dict: dict[str, Any] = {}

for file_path in data_path.glob("*.json"):
  with open(file_path, "r", encoding="utf-8") as file:
    data_dict[file_path.name] = json.load(file)

@app.get("/")
def read_root():
  return {"status": "success", "message": "Python backend running successfully!"}

@app.get("/restaurants")
def get_restaurants():
  return data_dict["restaurant-basic.json"]

@app.get("/restaurants/{id}")
def get_restaurant(id: int):
  restaurant_data: list[dict[str, Any]] = data_dict["restaurant-basic.json"]
  rest = next((r for r in restaurant_data if r["id"] == id), None)

  if rest is None:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"Restaurant with id {id} not found"
    )

  return rest