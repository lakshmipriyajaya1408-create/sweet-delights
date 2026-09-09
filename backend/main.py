from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

from database import engine, SessionLocal
import models
import schemas

# =========================
# ORDER REQUEST MODELS
# =========================

class OrderItemRequest(BaseModel):
    id: int
    name: str
    price: float
    quantity: int


class OrderRequest(BaseModel):
    fullName: str
    phone: str
    email: str
    address: str
    city: str
    pincode: str
    deliveryDate: str
    totalPrice: float
    items: List[OrderItemRequest]


# =========================
# FASTAPI APP
# =========================

app = FastAPI()


# =========================
# CORS
# =========================

# Allow React frontend to access FastAPI backend
app.add_middleware(
    CORSMiddleware,
   allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://sweet-delights-cake-pi.vercel.app",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# CREATE DATABASE TABLES
# =========================

models.Base.metadata.create_all(bind=engine)


# =========================
# DATABASE CONNECTION
# =========================

def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =========================
# HOME API
# =========================

@app.get("/")
def home():
    return {
        "message": "Sweet Delights Backend is Running 🎂"
    }


# =========================
# GET ALL CAKES
# =========================

@app.get("/cakes")
def get_cakes(db: Session = Depends(get_db)):
    cakes = db.query(models.Cake).all()

    return cakes


# =========================
# SEED INITIAL CAKES
# =========================

@app.post("/cakes/seed")
def seed_cakes(db: Session = Depends(get_db)):

    # Prevent duplicate cakes
    existing_cakes = db.query(models.Cake).count()

    if existing_cakes > 0:
        return {
            "message": "Cakes already exist in database"
        }

    cakes = [

        models.Cake(
            name="Chocolate Truffle",
            category="Chocolate Cake",
            description="Rich chocolate cake with creamy chocolate frosting.",
            price=699,
            emoji="🍫🎂"
        ),

        models.Cake(
            name="Red Velvet",
            category="Special Cake",
            description="Soft red velvet cake with delicious cream cheese frosting.",
            price=799,
            emoji="❤️🎂"
        ),

        models.Cake(
            name="Black Forest",
            category="Chocolate Cake",
            description="Classic chocolate cake with cherries and fresh cream.",
            price=649,
            emoji="🍒🎂"
        ),

        models.Cake(
            name="Birthday Celebration",
            category="Birthday Cake",
            description="A colourful cake perfect for birthday celebrations.",
            price=899,
            emoji="🎉🎂"
        ),

        models.Cake(
            name="Strawberry Delight",
            category="Special Cake",
            description="Fresh strawberry cake with soft and creamy layers.",
            price=749,
            emoji="🍓🎂"
        ),

        models.Cake(
            name="Butterscotch Cake",
            category="Classic Cake",
            description="Delicious butterscotch cake with crunchy caramel topping.",
            price=699,
            emoji="🍯🎂"
        ),
    ]

    db.add_all(cakes)
    db.commit()

    return {
        "message": "6 cakes added successfully 🎂"
    }


# =========================
# CREATE ORDER
# =========================

# =========================
# CREATE ORDER
# =========================
@app.post("/orders")
def create_order(
    order_data: schemas.OrderCreate,
    db: Session = Depends(get_db)
):

    # Get items from frontend
    items = order_data.items

    # Check if cart is empty
    if len(items) == 0:
        return {
            "message": "Cart is empty"
        }

    # Create the main order
    new_order = models.Order(
        full_name=order_data.fullName,
        phone=order_data.phone,
        email=order_data.email,
        address=order_data.address,
        city=order_data.city,
        pincode=order_data.pincode,
        delivery_date=order_data.deliveryDate,
        total_price=order_data.totalPrice,
        status="Pending",
    )

    # Save order first
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    # Save each cake inside order_items
    for item in items:

        order_item = models.OrderItem(
            order_id=new_order.id,
            cake_id=item.id,
            cake_name=item.name,
            price=item.price,
            quantity=item.quantity,
        )

        db.add(order_item)

    # Save all order items
    db.commit()

    return {
        "message": "Order placed successfully 🎉",
        "order_id": new_order.id,
    }
# =========================
# GET ALL ORDERS
# =========================
# =========================
# GET ALL ORDERS WITH ITEMS
# =========================
@app.get("/orders")
def get_orders(db: Session = Depends(get_db)):

    orders = db.query(models.Order).all()

    orders_list = []

    for order in orders:

        order_data = {
            "id": order.id,
            "full_name": order.full_name,
            "phone": order.phone,
            "email": order.email,
            "address": order.address,
            "city": order.city,
            "pincode": order.pincode,
            "delivery_date": order.delivery_date,
            "total_price": order.total_price,
            "status": order.status,

            "items": []
        }

        # Add cakes inside this order
        for item in order.items:

            order_data["items"].append({
                "id": item.id,
                "cake_id": item.cake_id,
                "cake_name": item.cake_name,
                "price": item.price,
                "quantity": item.quantity
            })

        orders_list.append(order_data)

    return orders_list