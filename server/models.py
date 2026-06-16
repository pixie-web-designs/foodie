from pydantic import BaseModel, EmailStr, Field, field_validator

# User data
class RegisterRequest(BaseModel):
  name: str
  email: EmailStr
  password: str = Field(min_length=12)

  @field_validator("password")
  @classmethod
  def password_strength(cls, v: str):
    if (
      len(v) < 12
      or not any(c.isupper() for c in v)
      or not any(c.islower() for c in v)
      or not any(c.isdigit() for c in v)
    ):
      raise ValueError("Password is too weak")
    return v

class LoginRequest(BaseModel):
  email: EmailStr
  password: str

class User(BaseModel):
  id: str
  name: str
  email: str
  password: str
  verified: bool = False
  verification_token_hash: str | None = None
  verification_expires_at: str

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
