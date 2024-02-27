from typing import List
from fastapi import APIRouter, HTTPException, Path
from app.controllers.flight_controller import FlightController
from app.models.flight import Flight
from app.models.response import GenericResponse
from app.schemas.flight_schema import AddFlightSchema

router = APIRouter()
flight_controller = FlightController()

@router.post("/add-flight", response_model=GenericResponse)
async def add_flight(flight: AddFlightSchema):
    return flight_controller.add_flight(flight)

@router.delete("/delete-flight/{flight_id}", response_model=GenericResponse)
async def delete_flight(flight_id: str):
    try:
        response = flight_controller.delete_flight(flight_id)
        return response
    except HTTPException as e:
        return e