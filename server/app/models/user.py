from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime  

class User(BaseModel):
    id: Optional[str] = None
    username: str
    email: str
    full_name: str | None = None
    password: str = None
    registrationDate: datetime = None


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None

class UserInDB(User):
    hashed_password: str


