from bson import ObjectId
from app.models.admin import Admin
from app.models.response import AuthResponse, GenericResponse
from app.db.connection import db
from datetime import datetime, timedelta
from passlib.context import CryptContext
import jwt
from fastapi import HTTPException, status

from app.models.flight import FlightBooking
class AdminController:
    def __init__(self, secret_key="bookmyflight", algorithm="HS256"):
         self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
         self.secret_key = secret_key
         self.algorithm = algorithm

    def create_admin(self, admin: Admin) -> AuthResponse:
        existing_admin_email = db.get_database()["admin"].find_one({"email": admin.email})
        existing_admin_adminname = db.get_database()["admin"].find_one({"adminname": admin.username})
        
        if existing_admin_email or existing_admin_adminname:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="admin with this email or adminname already exists"
            )
        admin_data = admin.model_dump()
        hashed_password = self.pwd_context.hash(admin_data["password"])
        admin_data["password"] = hashed_password
        
        admin_data["registrationDate"] = datetime.utcnow()
        admin_id = db.get_database()["admin"].insert_one(admin_data).inserted_id
        admin_data["id"] = str(admin_id)
        jwt_token = self.create_jwt_token(admin_data["id"])
        
        return AuthResponse(
            success=True,
            message="admin registration successful",
            data=Admin(**admin_data),
            token=jwt_token,
            status_code=status.HTTP_200_OK
        )
    
    
    def create_jwt_token(self, admin_id: str) -> str:
        expires_in = timedelta(days=1)
        payload = {
            "sub": admin_id,
            "exp": datetime.utcnow() + expires_in,
        }
        token = jwt.encode(payload, self.secret_key, algorithm=self.algorithm)
        return token
    
    
    
    def login_admin(self, admin: Admin) -> AuthResponse:
        adminemail = admin.email
        password = admin.password

        admin_data = db.get_database()["admin"].find_one({"email": adminemail})
        
        admin_data["_id"] = str(admin_data["_id"])
        
        if admin_data is None or not self.pwd_context.verify(password, admin_data["password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )

        jwt_token = self.create_jwt_token(str(admin_data["_id"]))

        return AuthResponse(
            success=True,
            message="Login successful",
            data=admin_data,
            token=jwt_token,
            status_code=status.HTTP_200_OK
        )
        

    def get_admin_bookings(self, admin_id: str) -> GenericResponse:
        admin = db.get_database()["admin"].find_one({"_id": ObjectId(admin_id)})
        if not admin:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="admin not found"
            )

        bookings_cursor = db.get_database()["bookings"].find({"admin_id": admin_id})
        bookings_list = [FlightBooking(**booking) for booking in bookings_cursor]

        return GenericResponse(
            success=True,
            message="admin bookings retrieved successfully",
            data=bookings_list,
            status_code=status.HTTP_200_OK
        )