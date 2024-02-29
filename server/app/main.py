from datetime import datetime, timedelta, timezone
from typing import Annotated
from app.routes import user_routes, flight_routes, admin_routes
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from app.db.connection import db
from app.models.user import Token, TokenData, User, UserInDB
from app.middleware.Auth import authenticate_user, create_access_token
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}




app.include_router(user_routes.router, prefix="/api", tags=["users"])
app.include_router(flight_routes.router, prefix="/api", tags=["flights"])
app.include_router(admin_routes.router, prefix="/api/admin", tags=["admin"])

@app.get("/")
async def read_root():
    return {"message": "Navigate to /docs for the API documentation."}
