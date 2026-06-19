import os
import httpx

from config import settings

# Verify Turnstile url secret exists
def check_turnstile_url_exists():
  secret = settings.TURNSTILE_VERIFY_URL
  if not secret:
    raise RuntimeError("TURNSTILE_VERIFY_URL not configured")

# Verify CAPTCHA secret exists
def check_turnstile_secret_exists():
  secret = settings.TURNSTILE_SECRET_KEY
  if not secret:
    raise RuntimeError("TURNSTILE_SECRET_KEY not configured")    

# Turnstile verification
async def verify_turnstile(token: str) -> bool:
  check_turnstile_url_exists()
  check_turnstile_secret_exists()
  async with httpx.AsyncClient(timeout=5.0) as client:
    res = await client.post(
      settings.TURNSTILE_VERIFY_URL,
      data={
        "secret": settings.TURNSTILE_SECRET_KEY,
        "response": token,
      },
    )
    return res.json().get("success", False)