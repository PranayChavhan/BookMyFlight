import uvicorn
from app.db.connection import success_message
from dotenv import load_dotenv
import os


load_dotenv()

port_number = os.getenv("PORT")

print(success_message)
if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=int(port_number), reload=True)
