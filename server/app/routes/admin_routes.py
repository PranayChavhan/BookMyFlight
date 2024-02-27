from fastapi import APIRouter
from app.controllers.admin_controller import AdminController
from app.models.response import AuthResponse, GenericResponse
from app.schemas.admin_schema import AdminSigninSchema, AdminSignupSchema

router = APIRouter()
admin_controller = AdminController()

@router.post("/signup", response_model=AuthResponse)
async def create_admin(admin: AdminSignupSchema):
    return admin_controller.create_admin(admin)

@router.post("/signin", response_model=AuthResponse)
async def login_admin(admin: AdminSigninSchema):
    return admin_controller.login_admin(admin)

