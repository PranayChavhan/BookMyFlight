from pymongo import MongoClient
from pymongo.database import Database
from dotenv import load_dotenv
import os


load_dotenv()

mongo_uri = os.getenv("MONGO_URI")
class MongoDB:
    def __init__(self, uri: str, db_name: str):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]

    def get_database(self) -> Database:
        return self.db

    def test_connection(self) -> str:
        try:
            self.db["flights"].find_one()
            return "MongoDB connection successful!"
        except Exception as e:
            return f"Error connecting to MongoDB: {str(e)}"


mongo_db_name = "flightbooking"

db = MongoDB(uri=mongo_uri, db_name=mongo_db_name)
success_message = db.test_connection()
print(success_message)
