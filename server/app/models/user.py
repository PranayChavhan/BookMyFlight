from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime
class User(BaseModel):
    id: Optional[str] = None
    username: str
    email: EmailStr
    password: str
    registrationDate: datetime = None
    
