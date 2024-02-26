from fastapi import APIRouter, HTTPException, Path
from app.controllers.user_controller import UserController
from app.models.user import User
from app.models.response import AuthResponse
from app.schemas.user_schema import UserSigninSchema, UserSignupSchema

router = APIRouter()
user_controller = UserController()

@router.get("/users/{user_id}", response_model=User)
async def read_user(user_id: str = Path(..., title="The ID of the user")):
    user = user_controller.get_user(user_id)
    if user:
        return user
    raise HTTPException(status_code=404, detail="User not found")


@router.post("/signup", response_model=AuthResponse)
async def create_user(user: UserSignupSchema):
    return user_controller.create_user(user)

@router.post("/signin", response_model=AuthResponse)
async def login_user(user: UserSigninSchema):
    return user_controller.login_user(user)