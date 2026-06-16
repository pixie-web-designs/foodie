from fastapi import HTTPException, status

from repositories import restaurant_repository

def get_restaurant_by_id(id: int):
  restaurant = restaurant_repository.load_restaurant(id)

  if restaurant is None:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Restaurant with id {id} not found")

  return restaurant

def get_restaurants():
  return restaurant_repository.load_restaurants()