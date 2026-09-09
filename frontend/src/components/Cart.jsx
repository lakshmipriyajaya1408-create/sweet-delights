import { useCart } from "../context/CartContext";

function Cart({ isOpen, closeCart,openCheckout }) {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  return (
    <>
      {isOpen && (
        <div className="cart-overlay" onClick={closeCart}>
          <div
            className="cart-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <h2>🛒 Your Cart</h2>

              <button
                className="close-cart-btn"
                onClick={closeCart}
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🎂</div>

                <h3>Your cart is empty</h3>

                <p>Add some delicious cakes!</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div
                      className="cart-item"
                      key={item.id}
                    >
                      <div className="cart-item-image">
                        {item.emoji}
                      </div>

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>

                        <p>₹{item.price}</p>

                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                          >
                            −
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        🗑
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total</span>

                    <strong>
                      ₹{totalPrice}
                    </strong>
                  </div>

                <button
  className="checkout-btn"
  onClick={openCheckout}
>
  Proceed to Checkout 🍰
</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;