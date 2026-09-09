import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

function Checkout({ goBack }) {
  const { cart, totalPrice, clearCart } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [finalOrderTotal, setFinalOrderTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    deliveryDate: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // =========================
  // PLACE ORDER
  // =========================
  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.pincode ||
      !formData.deliveryDate
    ) {
      alert("Please fill in all delivery details.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderData = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      deliveryDate: formData.deliveryDate,
      totalPrice: totalPrice,

      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      setIsSubmitting(true);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.detail ||
            data.message ||
            "Something went wrong while placing your order."
        );

        return;
      }

      setFinalOrderTotal(totalPrice);
      setOrderId(data.order_id);

      setOrderPlaced(true);

      clearCart();
    } catch (error) {
      console.error("Order error:", error);

      alert(
        "Unable to connect to the backend. Please make sure FastAPI is running."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================
  // SUCCESS PAGE
  // =========================
  if (orderPlaced) {
    return (
      <div className="order-success-page">

        <div className="success-card">

          <div className="success-icon">
            🎉
          </div>

          <div className="success-cake">
            🎂
          </div>

          <h1>Order Placed Successfully!</h1>

          <p className="success-thank-you">
            Thank you, <strong>{formData.fullName}</strong>!
          </p>

          <p className="success-description">
            Your delicious cakes will be prepared
            and delivered with love.
          </p>

          <div className="success-order-id">
            Order ID
            <strong>#{orderId}</strong>
          </div>

          <div className="success-amount">
            <span>Order Total</span>
            <strong>₹{finalOrderTotal}</strong>
          </div>

          <button
            className="continue-shopping-btn"
            onClick={goBack}
          >
            Continue Shopping 🍰
          </button>

        </div>

      </div>
    );
  }

  // =========================
  // CHECKOUT PAGE
  // =========================
  return (
    <div className="checkout-page">

      {/* =========================
          TOP HEADER
      ========================= */}
      <header className="checkout-top-header">

        <div className="checkout-brand">

          <div className="brand-logo">
            🎂
          </div>

          <div>
            <div className="brand-name">
              Sweet Delights
            </div>

            <div className="brand-tagline">
              CAKES • FOR EVERY MOMENT
            </div>
          </div>

        </div>

        <nav className="checkout-nav">

          <button onClick={goBack}>
            Home
          </button>

          <button onClick={goBack}>
            Cakes
          </button>

          <button className="checkout-nav-active">
            Checkout
          </button>

        </nav>

        <div className="checkout-header-icons">

          <span className="header-search">
            ⌕
          </span>

          <span className="header-cart">
            🛒
            {cart.length > 0 && (
              <small>{cart.length}</small>
            )}
          </span>

          <span className="header-profile">
            ♙
          </span>

        </div>

      </header>

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <main className="checkout-main">

        {/* BACK */}
        <button
          className="checkout-back-btn"
          onClick={goBack}
        >
          ← Back to Shop
        </button>

        {/* PAGE TITLE */}
        <div className="checkout-title-section">

          <div className="checkout-title-icon">
            🎂
          </div>

          <div>

            <h1>
              Checkout
            </h1>

            <p>
              Complete your delivery details and place your order
            </p>

          </div>

          <div className="checkout-decoration">
            <span>Fresh Cakes</span>
            <br />
            Happier Moments ♡
          </div>

        </div>

        {/* =========================
            TWO COLUMN LAYOUT
        ========================= */}
        <div className="checkout-layout">

          {/* =========================
              LEFT - DELIVERY FORM
          ========================= */}
          <section className="delivery-details-card">

            <div className="card-heading">

              <div className="card-heading-icon">
                🚚
              </div>

              <div>
                <h2>
                  Delivery Details
                </h2>

                <p>
                  Please provide your details to complete the order
                </p>
              </div>

            </div>

            <form
              className="delivery-form"
              onSubmit={handlePlaceOrder}
            >

              {/* FULL NAME */}
              <div className="checkout-form-group">

                <label>
                  <span className="label-icon">
                    👤
                  </span>

                  Full Name
                  <span className="required">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />

              </div>

              {/* PHONE + EMAIL */}
              <div className="checkout-form-row">

                <div className="checkout-form-group">

                  <label>
                    <span className="label-icon">
                      📞
                    </span>

                    Phone Number
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                </div>

                <div className="checkout-form-group">

                  <label>
                    <span className="label-icon">
                      ✉️
                    </span>

                    Email Address
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* ADDRESS */}
              <div className="checkout-form-group">

                <label>
                  <span className="label-icon">
                    📍
                  </span>

                  Delivery Address
                  <span className="required">
                    *
                  </span>
                </label>

                <textarea
                  name="address"
                  placeholder="Enter your complete delivery address"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                />

              </div>

              {/* CITY + PINCODE */}
              <div className="checkout-form-row">

                <div className="checkout-form-group">

                  <label>
                    <span className="label-icon">
                      🏙️
                    </span>

                    City
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                  />

                </div>

                <div className="checkout-form-group">

                  <label>
                    <span className="label-icon">
                      📮
                    </span>

                    Pincode
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    placeholder="Enter pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* DELIVERY DATE */}
              <div className="checkout-form-group">

                <label>
                  <span className="label-icon">
                    📅
                  </span>

                  Delivery Date
                  <span className="required">
                    *
                  </span>
                </label>

                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                />

              </div>

              {/* DELIVERY MESSAGE */}
              <div className="delivery-message">

                <div className="delivery-message-icon">
                  🚚
                </div>

                <div>

                  <strong>
                    We deliver fresh and delicious cakes to your doorstep!
                  </strong>

                  <p>
                    Your order will be delivered on your selected date.
                  </p>

                </div>

              </div>

              {/* MOBILE PLACE ORDER BUTTON */}
              <button
                type="submit"
                className="mobile-place-order-btn"
                disabled={
                  cart.length === 0 ||
                  isSubmitting
                }
              >
                {isSubmitting
                  ? "Placing Order..."
                  : "🔒 Place Order →"}
              </button>

            </form>

          </section>

          {/* =========================
              RIGHT - ORDER SUMMARY
          ========================= */}
          <aside className="order-summary-card">

            <div className="order-summary-heading">

              <div className="card-heading-icon">
                🛒
              </div>

              <h2>
                Your Order
              </h2>

              <span className="items-count">
                {cart.length}{" "}
                {cart.length === 1 ? "item" : "items"}
              </span>

            </div>

            {/* ITEMS */}
            <div className="checkout-items">

              {cart.map((item) => (

                <div
                  className="checkout-item"
                  key={item.id}
                >

                  <div className="checkout-item-image">

                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <span>
                        {item.emoji || "🎂"}
                      </span>
                    )}

                  </div>

                  <div className="checkout-item-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      ₹{item.price}
                    </p>

                    <span>
                      × {item.quantity}
                    </span>

                  </div>

                  <strong className="checkout-item-total">
                    ₹{item.price * item.quantity}
                  </strong>

                </div>

              ))}

            </div>

            {/* PRICE SUMMARY */}
            <div className="price-breakdown">

              <div className="price-row">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹{totalPrice}
                </strong>

              </div>

              <div className="price-row">

                <span>
                  Delivery Charges
                </span>

                <strong>
                  ₹0
                </strong>

              </div>

              <div className="price-divider"></div>

              <div className="final-price-row">

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹{totalPrice}
                </strong>

              </div>

            </div>

            {/* DESKTOP PLACE ORDER */}
            <button
              type="button"
              className="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={
                cart.length === 0 ||
                isSubmitting
              }
            >
              {isSubmitting ? (
                "Placing Order..."
              ) : (
                <>
                  🔒 &nbsp; Place Order &nbsp; →
                </>
              )}
            </button>

            <div className="secure-payment">
              🛡️ Your information is safe and secure
            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default Checkout;