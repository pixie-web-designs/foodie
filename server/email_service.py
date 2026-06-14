import os
import smtplib
from email.message import EmailMessage

email_user: str = os.environ["EMAIL_USER"];

def send_verification_email(email: str, token: str):
  verification_url = (f"{os.getenv("API_URL")}/verify?token={token}")
  msg = EmailMessage()
  msg["Subject"] = "Verify your account"
  msg["From"] = os.getenv("EMAIL_USER")
  msg["To"] = email

  msg.set_content(
    f"""
Welcome!

Thank you for registering.

Please verify your account by visiting:

{verification_url}

If you did not create this account, you may safely ignore this email.
"""
  )

  with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
    smtp.login(
      os.getenv("EMAIL_USER"),
      os.getenv("EMAIL_PASS")
    )
    smtp.send_message(msg)