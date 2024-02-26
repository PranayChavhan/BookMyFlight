from app.models.user import User
from app.models.response import AuthResponse
from app.db.connection import db
from datetime import datetime, timedelta
from passlib.context import CryptContext
import jwt
from fastapi import HTTPException, status
class UserController:
    def __init__(self, secret_key="bookmyflight", algorithm="HS256"):
         self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
         self.secret_key = secret_key
         self.algorithm = algorithm
    
     
    def get_user(self, user_id: str) -> User:
        user_data = db.get_database()["users"].find_one({"_id": user_id})
        
        if user_data:
            user_data["id"] = str(user_data["_id"])
            del user_data["_id"]
            
            return User(**user_data)
        else:
            return None



    def create_user(self, user: User) -> AuthResponse:
        existing_user_email = db.get_database()["users"].find_one({"email": user.email})
        existing_user_username = db.get_database()["users"].find_one({"username": user.username})
        
        if existing_user_email or existing_user_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email or username already exists"
            )
        user_data = user.model_dump()
        hashed_password = self.pwd_context.hash(user_data["password"])
        user_data["password"] = hashed_password
        
        user_data["registrationDate"] = datetime.utcnow()
        user_id = db.get_database()["users"].insert_one(user_data).inserted_id
        user_data["user_id"] = str(user_id)
        jwt_token = self.create_jwt_token(user_data["user_id"])
        
        return AuthResponse(
            success=True,
            message="User registration successful",
            data=User(**user_data),
            token=jwt_token,
            status_code=status.HTTP_200_OK
        )
    
    
    def create_jwt_token(self, user_id: str) -> str:
        expires_in = timedelta(days=1)
        payload = {
            "sub": user_id,
            "exp": datetime.utcnow() + expires_in,
        }
        token = jwt.encode(payload, self.secret_key, algorithm=self.algorithm)
        return token
    
    
    
    def login_user(self, user: User) -> AuthResponse:
        useremail = user.email
        password = user.password

        user_data = db.get_database()["users"].find_one({"email": useremail})

        if user_data is None or not self.pwd_context.verify(password, user_data["password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )

        jwt_token = self.create_jwt_token(str(user_data["_id"]))

        return AuthResponse(
            success=True,
            message="Login successful",
            data=User(**user_data),
            token=jwt_token,
            status_code=status.HTTP_200_OK
        )
