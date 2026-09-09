import { useEffect, useState } from "react";
import "./AdminOrders.css";

function AdminOrders({ goBack }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load orders");
        }

        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Could not load orders. Please check the backend.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="admin-page">
        <p className="admin-message">
          Loading orders... 🎂
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <p className="admin-error">
          {error}
        </p>

        <button
          className="admin-back-btn"
          onClick={goBack}
        >
          ← Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="admin-page">

      <div className="admin-header">

        <div>
          <p className="admin-tag">
            SWEET DELIGHTS
          </p>

          <h1>
            Orders Dashboard 🎂
          </h1>

          <p>
            View and manage customer cake orders.
          </p>
        </div>

        <button
          className="admin-back-btn"
          onClick={goBack}
        >
          ← Back to Shop
        </button>

      </div>

      <div className="orders-count">
        Total Orders: {orders.length}
      </div>

      {orders.length === 0 ? (

        <div className="no-orders">
          <h2>No orders yet 🎂</h2>

          <p>
            Customer orders will appear here.
          </p>
        </div>

      ) : (

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order.id}
            >

              <div className="order-top">

                <div>
                  <h2>
                    Order #{order.id}
                  </h2>

                  <p>
                    {order.full_name}
                  </p>
                </div>

                <span className="order-status">
                  {order.status}
                </span>

              </div>

              <div className="order-details">

                <div>
                  <span>📞 Phone</span>
                  <strong>{order.phone}</strong>
                </div>

                <div>
                  <span>📧 Email</span>
                  <strong>{order.email}</strong>
                </div>

                <div>
                  <span>📅 Delivery Date</span>
                  <strong>{order.delivery_date}</strong>
                </div>

                <div>
                  <span>📍 Address</span>
                  <strong>
                    {order.address}, {order.city} - {order.pincode}
                  </strong>
                </div>

              </div>

              <div className="order-items">

                <h3>Ordered Cakes 🍰</h3>

                {order.items.map((item) => (

                  <div
                    className="admin-order-item"
                    key={item.id}
                  >

                    <span>
                      {item.cake_name}
                    </span>

                    <span>
                      ₹{item.price} × {item.quantity}
                    </span>

                    <strong>
                      ₹{item.price * item.quantity}
                    </strong>

                  </div>

                ))}

              </div>

              <div className="admin-order-total">

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹{order.total_price}
                </strong>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default AdminOrders;