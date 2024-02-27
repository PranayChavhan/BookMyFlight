from pydantic import BaseModel, EmailStr

class AdminSigninSchema(BaseModel):
    email: EmailStr
    password: str

class AdminSignupSchema(BaseModel):
    username: str
    email: EmailStr
    password: str
