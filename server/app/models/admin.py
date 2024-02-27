from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime
class Admin(BaseModel):
    id: Optional[str] = None
    username: str
    email: EmailStr
    password: str
    registrationDate: datetime = None
    
