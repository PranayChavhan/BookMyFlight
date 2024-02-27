# app/models/response.py

from typing import Optional, Any
from pydantic import BaseModel
 
class AuthResponse(BaseModel):
    success: bool
    message: Optional[str]
    data: Any = None
    token: Optional[str]
    status_code: Optional[int] = None
    
    
class GenericResponse(BaseModel):
    """Generic response model for all responses"""
    success: bool
    message: Optional[str]
    data: Any = None
    status_code: Optional[int] = None