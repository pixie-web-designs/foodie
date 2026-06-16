from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
  # JWT
  JWT_DEV_SECRET: str
  JWT_FALLBACK_SECRET: str
  JWT_ALGORITHM: str = "HS256"

  # Email
  EMAIL_USER: str
  EMAIL_PASS: str

  # Backend
  API_URL: str = "http://localhost:8000"

  # Frontend
  FRONTEND_URL: str = "http://localhost:3000"

  # CAPTCHA
  TURNSTILE_SITE_KEY: str
  TURNSTILE_SECRET_KEY: str

  # Environment
  ENVIRONMENT: str = "development"

  model_config = SettingsConfigDict(
    env_file=".env.development",
    extra="ignore"
  )

settings = Settings()
