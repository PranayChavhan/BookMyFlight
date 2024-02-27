from bson import ObjectId
from app.models.flight import Flight
from app.models.response import GenericResponse
from app.db.connection import db
from fastapi import HTTPException, status
class FlightController:
    
    def __init__(self):
        self.flights_collection = db.get_database()["flights"]

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