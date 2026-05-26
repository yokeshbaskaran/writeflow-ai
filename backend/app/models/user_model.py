from pydantic import BaseModel, EmailStr
from typing import Optional


# User Model
class User(BaseModel):
    id: Optional[str] = None
    username: str
    email: EmailStr
    # Credits
    credits: int = 20


# User Response Schema
class UserResponse(BaseModel):
    username: str
    email: EmailStr
    credits: int
