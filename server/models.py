from pydantic import BaseModel, EmailStr

# User data
class RegisterRequest(BaseModel):
  name: str
  email: EmailStr
  password: str

class User(BaseModel):
  id: str
  name: str
  email: str
  password: str
  verified: bool = False
  verification_token: str | None = None

# Restaurant data
class Restaurant(BaseModel):
  id: int
  name: str
  address: str
  img: str
  alt: str
  status: list[str]
  tags: list[str]

class Menu(BaseModel):
  id: int
  restaurantId: int
  desc: str

class Category(BaseModel):
  id: int
  menuId: int
  name: str
  displayOrder: int

class Item(BaseModel):
  id: int
  categoryId: int
  name: str
  desc: str
  price: float
  hasAlcohol: bool
  dietaryTags: list[str]
  allergens: list[str]
