from fastapi import APIRouter, HTTPException, Path
from app.controllers.user_controller import UserController
from app.models.user import User
from typing import List

router = APIRouter()
user_controller = UserController()

@router.get("/users/{user_id}", response_model=User)
async def read_user(user_id: str = Path(..., title="The ID of the user")):
    user = user_controller.get_user(user_id)
    if user:
        return user
    raise HTTPException(status_code=404, detail="User not found")

@router.get("/users", response_model=List[User])
async def read_all_users():
    return user_controller.get_all_users()

@router.post("/users", response_model=User)
async def create_user(user: User):
    return user_controller.create_user(user)
