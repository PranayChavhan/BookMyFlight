from typing import Annotated
from fastapi import APIRouter, Depends
from app.controllers.user_controller import UserController
from app.models.response import AuthResponse, GenericResponse
from app.schemas.user_schema import UserSigninSchema, UserSignupSchema
from app.models.user import User
from app.middleware.Auth import get_current_active_user

router = APIRouter()
user_controller = UserController()

@router.get("/users/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    return current_user


@router.post("/signup", response_model=AuthResponse)
async def create_user(user: UserSignupSchema):
    return user_controller.create_user(user)

@router.post("/signin", response_model=AuthResponse)
async def login_user(user: UserSigninSchema):
    return user_controller.login_user(user)

@router.get("/users/{user_id}/bookings", response_model=GenericResponse)
async def get_user_bookings(user_id: str, current_user: Annotated[User, Depends(get_current_active_user)]):
    response = user_controller.get_user_bookings(user_id)
    return response