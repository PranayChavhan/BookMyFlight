# app/models/response.py

from typing import Optional, Any
from pydantic import BaseModel
 
class AuthResponse(BaseModel):
    """Generic response model for all responses"""
    success: bool
    message: Optional[str]
    data: Any = None
    token: Optional[str]
    status_code: Optional[int] = None
    