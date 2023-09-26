from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

class MongoDB:
    def __init__(self) -> None:
        self.client = None
        self.db = None
        
    def connect(self):
        self.client = AsyncIOMotorClient(os.getenv("MONGDB_URL"))
        self.db = self.client.get_database(os.getenv("MONGDB_DB"))
        
    def close(self):
        self.client.close()
