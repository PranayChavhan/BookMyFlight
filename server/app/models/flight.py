from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class FlightClass(BaseModel):
    class_name: str
    seats_available: int
    price_multiplier: float
    booking_status: bool = False

class Flight(BaseModel):
    id: Optional[str] = None
    airline: str
    flight_number: str
    departure_city: str
    destination_city: str
    departure_time: datetime
    arrival_time: datetime
    base_price: float
    aircraft_type: str
    booking_status: bool = False
    classes: List[FlightClass] = []
    
    
class Passenger(BaseModel):
    name: str
    age: int
    gender: str

class FlightBooking(BaseModel):
    user_id: str
    flight_id: str
    passengers: List[Passenger]
    booking_date: datetime
    total_price: float