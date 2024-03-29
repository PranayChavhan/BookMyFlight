from typing import Annotated, List
from fastapi import APIRouter, Depends, HTTPException, Path, Query
from app.controllers.flight_controller import FlightController
from app.models.flight import Flight
from app.models.response import GenericResponse
from app.schemas.flight_schema import AddFlightSchema, FlightBookingSchema
from datetime import datetime
from app.middleware.Auth import get_current_active_user
from app.models.user import User


router = APIRouter()
flight_controller = FlightController()


@router.post("/add-flight", response_model=GenericResponse)
async def add_flight(flight: AddFlightSchema, current_user: Annotated[User, Depends(get_current_active_user)]):
    return flight_controller.add_flight(flight)

@router.delete("/delete-flight/{flight_id}", response_model=GenericResponse)
async def delete_flight(flight_id: str, current_user: Annotated[User, Depends(get_current_active_user)]):
    try:
        response = flight_controller.delete_flight(flight_id)
        return response
    except HTTPException as e:
        return e
    
@router.get("/flights", response_model=GenericResponse)
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
async def book_flight(booking: FlightBookingSchema, current_user: Annotated[User, Depends(get_current_active_user)]):
    response = flight_controller.book_flight(booking)
    return response


@router.get("/flight/{flight_id}", response_model=GenericResponse)
async def get_flight_by_id(flight_id: str):
    return flight_controller.get_flight_by_id(flight_id)


@router.get("/bookings", response_model=list[FlightBookingSchema])
def get_all_bookings():
    bookings = flight_controller.get_all_bookings()
    return bookings