from pymongo import MongoClient
from pymongo.database import Database

class MongoDB:
    def __init__(self, uri: str, db_name: str):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]

    def get_database(self) -> Database:
        return self.db

    def test_connection(self) -> str:
        try:
            self.db["flight"].find_one()
            return "MongoDB connection successful!"
        except Exception as e:
            return f"Error connecting to MongoDB: {str(e)}"


mongo_uri = "mongodb+srv://chavhanpranay:7774860123@cluster0.mt1t8k5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongo_db_name = "flightbooking"

db = MongoDB(uri=mongo_uri, db_name=mongo_db_name)
success_message = db.test_connection()
print(success_message)
