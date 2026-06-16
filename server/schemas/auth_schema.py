from pydantic import BaseModel, EmailStr, Field, field_validator

# Auth models
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
  
  turnstile_token: str

class LoginRequest(BaseModel):
  email: EmailStr
  password: str