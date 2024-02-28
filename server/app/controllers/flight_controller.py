from typing import List
from bson import ObjectId
from app.models.flight import Flight, FlightBooking
from app.models.response import GenericResponse
from app.db.connection import db
from fastapi import HTTPException, status
from datetime import datetime

from app.models.user import User


class FlightController:
    
    def __init__(self):
        self.flights_collection = db.get_database()["flights"]
        self.bookings_collection = db.get_database()["bookings"]

    def add_flight(self, flight: Flight) -> GenericResponse:
        existing_flight = self.flights_collection.find_one({"flight_number": flight.flight_number})
        if existing_flight:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Flight with this flight number already exists"
            )
        flight_data = flight.model_dump()
        flight_data["departure_time"] = flight.departure_time.isoformat()
        flight_data["arrival_time"] = flight.arrival_time.isoformat()
        flight_id = self.flights_collection.insert_one(flight_data).inserted_id

        flight_data["id"] = str(flight_id)
        return GenericResponse(
            success=True,
            message="Flight data added successfully",
            data=Flight(**flight_data),
            status_code=status.HTTP_200_OK
        )

    
    def delete_flight(self, flight_id: str) -> GenericResponse:
        # Check if the flight with the given ID exists
        existing_flight = self.flights_collection.find_one({"_id": ObjectId(flight_id)})
        if not existing_flight:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Flight not found"
            )

        # Delete the flight with the given ID
        result = self.flights_collection.delete_one({"_id": ObjectId(flight_id)})

        if result.deleted_count == 1:
            return GenericResponse(
                success=True,
                message="Flight deleted successfully",
                status_code=status.HTTP_200_OK
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete flight"
            )
    
    def get_flights_by_criteria(
        self,
        departure_city: str,
        destination_city: str,
        departure_time: datetime
    ) -> List[Flight]:
        # Convert the provided datetime to the string representation of the date
        date_str = departure_time.date().isoformat()

        # Query the database to find flights based on the given criteria
        flights_cursor = self.flights_collection.find({
            "departure_city": departure_city,
            "destination_city": destination_city,
            "departure_time": {"$regex": f"^{date_str}"}
        })

        # Convert the MongoDB cursor to a list of Flight models
        flights_list = [Flight(**flight) for flight in flights_cursor]

        return flights_list
    
    
    def book_flight(self, booking: FlightBooking) -> GenericResponse:
        # Check if the flight exists
        flight = self.flights_collection.find_one({"_id": ObjectId(booking.flight_id)})
        if not flight:
            raise HTTPException(
                status_code=404,
                detail="Flight not found"
            )

        # Calculate total price based on the number of passengers and base price
        total_price = len(booking.passengers) * flight["base_price"]

        # Save the booking data to the database
        booking_data = booking.model_dump()
        booking_data["booking_date"] = datetime.utcnow()
        booking_data["total_price"] = total_price
        booking_id = self.bookings_collection.insert_one(booking_data).inserted_id

        # Return a response with the booking details
        return GenericResponse(
            success=True,
            message="Flight booked successfully",
            data={
                "booking_id": str(booking_id),
                "total_price": total_price,
                "booking_date": booking_data["booking_date"]
            },
            status_code=200
        )