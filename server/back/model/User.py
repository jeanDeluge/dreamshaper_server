from .db import MongoDB
from pydantic import BaseModel
import bcrypt

class User(BaseModel):
    username: str
    email: str
    password: str
