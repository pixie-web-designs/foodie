from pydantic import BaseModel, EmailStr, Field, field_validator

COMMON_PASSWORDS = set([
  "password",
  "123456",
  "123456789",
  "12345",
  "12345678",
  "qwerty",
  "abc123",
  "football",
  "monkey",
  "letmein",
])

# Auth models
class RegisterRequest(BaseModel):
  name: str
  email: EmailStr
  password: str = Field(min_length=12, max_length=128)

  @field_validator("password")
  @classmethod
  def password_strength(cls, v: str):
    if (v.lower() in COMMON_PASSWORDS):
      raise ValueError("Password is too common")
    return v
  
  turnstile_token: str

class LoginRequest(BaseModel):
  email: EmailStr
  password: str
