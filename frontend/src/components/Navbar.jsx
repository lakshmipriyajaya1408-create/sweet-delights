import { useCart } from "../context/CartContext";

function Navbar({ openCart, goToLogin, goToSignup }) {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">

      <div className="logo">
        🎂 Sweet Delights
      </div>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#cakes">Cakes</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="nav-actions">

        <button
          className="signup-btn"
          onClick={goToSignup}
        >
          Create Account
        </button>

        <button
          className="login-btn"
          onClick={goToLogin}
        >
          Login
        </button>

        <button
          className="cart-btn"
          onClick={openCart}
        >
          🛒 Cart ({totalItems})
        </button>

      </div>

    </nav>
  );
}

export default Navbar;