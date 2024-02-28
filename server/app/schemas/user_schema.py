from pydantic import BaseModel, EmailStr

class UserSigninSchema(BaseModel):
    email: EmailStr
    password: str

class UserSignupSchema(BaseModel):
    username: str
    full_name: str | None = None
    email: EmailStr
    password: str


class TokenPayload(BaseModel):
    sub: str = None
    exp: int = None
