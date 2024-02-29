import uvicorn
from app.db.connection import success_message

print(success_message)
if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8080, reload=True)
