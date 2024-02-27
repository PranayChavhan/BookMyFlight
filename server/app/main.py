from fastapi import FastAPI
from app.routes import user_routes, flight_routes

app = FastAPI()

app.include_router(user_routes.router, prefix="/api")
app.include_router(flight_routes.router, prefix="/api")


@app.get("/")
async def read_root():
    return {"message": "Navigate to /docs for the API documentation."}
