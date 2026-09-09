from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


# =========================
# CAKES TABLE
# =========================
class Cake(Base):
    __tablename__ = "cakes"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    category = Column(String(100), nullable=False)

    description = Column(String(500), nullable=False)

    price = Column(Float, nullable=False)

    emoji = Column(String(50), nullable=False)


# =========================
# ORDERS TABLE
# =========================
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    phone = Column(String(20), nullable=False)

    email = Column(String(100), nullable=False)

    address = Column(String(500), nullable=False)

    city = Column(String(100), nullable=False)

    pincode = Column(String(20), nullable=False)

    delivery_date = Column(String(50), nullable=False)

    total_price = Column(Float, nullable=False)

    status = Column(String(50), default="Pending")

    # Relationship with order items
    items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan"
    )


# =========================
# ORDER ITEMS TABLE
# =========================
class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)

    order_id = Column(
        Integer,
        ForeignKey("orders.id"),
        nullable=False
    )

    cake_id = Column(
        Integer,
        ForeignKey("cakes.id"),
        nullable=False
    )

    cake_name = Column(String(100), nullable=False)

    price = Column(Float, nullable=False)

    quantity = Column(Integer, nullable=False)

    # Relationship with order
    order = relationship(
        "Order",
        back_populates="items"
    )