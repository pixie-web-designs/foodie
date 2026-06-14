from pydantic import BaseModel, EmailStr

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
