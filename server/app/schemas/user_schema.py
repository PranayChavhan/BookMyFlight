from pydantic import BaseModel, EmailStr

class UserSigninSchema(BaseModel):
    email: EmailStr
    password: str

class UserSignupSchema(BaseModel):
    username: str
    email: EmailStr
    password: str
