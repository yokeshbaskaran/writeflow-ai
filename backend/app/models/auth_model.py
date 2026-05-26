# Create Schema
from pydantic import BaseModel, EmailStr


# 1. Signup Schema
class SignupRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


# 2. Login Schema
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
