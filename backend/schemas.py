from pydantic import BaseModel
from typing import List


# Individual cake/item inside an order
class OrderItemCreate(BaseModel):
    id: int
    name: str
    price: float
    quantity: int


# Complete order coming from the React frontend
class OrderCreate(BaseModel):
    fullName: str
    phone: str
    email: str
    address: str
    city: str
    pincode: str
    deliveryDate: str
    totalPrice: float

    items: List[OrderItemCreate]