from fastapi import FastAPI, HTTPException, status
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
import json
from pathlib import Path
from typing import Any

from restaurants import load_restaurants, load_restaurant

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
  return load_restaurants()

@app.get("/restaurants/{id}")
def get_restaurant(id: int):
  restaurant = load_restaurant(id)

  if restaurant is None:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail=f"Restaurant with id {id} not found"
    )

  return restaurant

