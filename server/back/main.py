from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from passlib.context import CryptContext
import jwt


import os
from model.db import MongoDB
from model.User import User
import bcrypt

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:3000", "http://172.20.0.2:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = MongoDB()


ACCESS_TOKEN_EXPIRE_MINUTES = 15
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

@app.on_event("startup")
def on_app_start():
    db.connect()
    
@app.on_event("shutdown")
async def on_app_shutdown():
	db.close()

@app.get("/")
def hello():
    return "hello"

@app.post("/register")
async def register(user: User):
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    user_data = {}
    user_data["username"] = user.username
    user_data["email"] = user.email
    user_data["password"] = hashed_password.decode('utf-8')
    
    user_collection = db.db["User"]
    await user_collection.insert_one(user_data)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user_data["email"]}, expires_delta=access_token_expires)

    return {"access_token": access_token, "token_type": "bearer", "name": user_data["username"], "email": user_data["email"]}

@app.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_collection = db.db["User"]
    user = await user_collection.find_one({"email": form_data.username})

    if user is None or not verify_password(form_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # 토큰 발급
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user["email"]}, expires_delta=access_token_expires)

    return {"access_token": access_token, "token_type": "bearer", "name": user["username"], "email": user["email"]}

## 로그인/회원가입 구현
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)  # 기본적으로 15분 동안 유효

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt