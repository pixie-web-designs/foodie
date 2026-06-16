from pydantic import BaseModel

# User model
class User(BaseModel):
  id: str
  name: str
  email: str
  password: str
  verified: bool = False
  verification_token_hash: str | None = None
  verification_expires_at: str