from typing import List
from app.models.user import User

class UserController:
    def get_user(self, user_id: str) -> User:
        # Logic to retrieve a user from the database
        # Example: user = db.get_user(user_id)
        return User(id=user_id, username="example_user")

    def get_all_users(self) -> List[User]:
        # Logic to retrieve all users from the database
        # Example: users = db.get_all_users()
        return [User(id="1", username="user1"), User(id="2", username="user2")]

    def create_user(self, user: User) -> User:
        # Logic to create a new user in the database
        # Example: created_user = db.create_user(user)
        return user
