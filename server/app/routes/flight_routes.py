from typing import List
from fastapi import APIRouter, HTTPException, Path, Query
from app.controllers.flight_controller import FlightController
from app.models.flight import Flight
from app.models.response import GenericResponse
from app.schemas.flight_schema import AddFlightSchema, FlightBookingSchema
from datetime import datetime
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
    
@router.get("/flights", response_model=List[Flight])
async def get_flights_by_criteria(
    departure_city: str = Query(..., title="Departure City"),
    destination_city: str = Query(..., title="Destination City"),
    departure_time: datetime = Query(..., title="Departure Date (YYYY-MM-DD)")
):
    try:
        flights = flight_controller.get_flights_by_criteria(
            departure_city=departure_city,
            destination_city=destination_city,
            departure_time=departure_time
        )
        return flights
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/flights/book", response_model=GenericResponse)
async def book_flight(booking: FlightBookingSchema):
    response = flight_controller.book_flight(booking)
    return response