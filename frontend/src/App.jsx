import { useState, useEffect } from "react";
import { useCart } from "./context/CartContext";

import AboutContact from "./components/AboutContact";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

import Checkout from "./pages/Checkout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import "./App.css";
import AdminOrders from "./pages/AdminOrders";
function App() {
  const { addToCart } = useCart();

  // Website starts on Create Account page
  const [page, setPage] = useState("signup");

  // Cart open / close
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cakes coming from FastAPI + MySQL
  const [products, setProducts] = useState([]);

  // Load cakes from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/cakes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load cakes");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Cakes from backend:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error loading cakes:", error);
      });
  }, []);

  // Scroll to All Cakes
  const scrollToCakes = () => {
    document
      .getElementById("cakes")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  // =========================
  // SIGNUP PAGE
  // =========================
  if (page === "signup") {
    return (
      <Signup
        goToLogin={() => setPage("login")}
        goHome={() => setPage("home")}
      />
    );
  }

  // =========================
  // LOGIN PAGE
  // =========================
  if (page === "login") {
    return (
      <Login
        goToSignup={() => setPage("signup")}
        goToHome={() => setPage("home")}
      />
    );
  }

  // =========================
  // CHECKOUT PAGE
  // =========================
  if (page === "checkout") {
    return (
      <Checkout
        goBack={() => setPage("home")}
      />
    );
  }
// =========================
// ADMIN ORDERS PAGE
// =========================
if (page === "admin") {
  return (
    <AdminOrders
      goBack={() => setPage("home")}
    />
  );
}
  // =========================
  // HOME PAGE
  // =========================
  return (
    <>
      {/* NAVBAR */}
      <Navbar
        openCart={() => setIsCartOpen(true)}
        goToSignup={() => setPage("signup")}
        goToLogin={() => setPage("login")}
      />

      {/* HERO */}
      <Hero
        exploreCakes={scrollToCakes}
      />

      {/* ALL CAKES */}
      <section
        className="products-section"
        id="cakes"
      >
        <div className="section-heading">
          <p className="section-tag">
            OUR BEST SELLERS
          </p>

          <h2>
            Popular Cakes 🎂
          </h2>

          <p>
            Choose your favourite cake and get it
            delivered to your doorstep.
          </p>
        </div>

        <div className="products-grid">
          {products.length === 0 ? (
            <p>Loading delicious cakes... 🎂</p>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          )}
        </div>
      </section>

      {/* ABOUT + CONTACT */}
      <AboutContact />

      {/* CART */}
      <Cart
        isOpen={isCartOpen}
        closeCart={() => setIsCartOpen(false)}
        openCheckout={() => {
          setIsCartOpen(false);
          setPage("checkout");
        }}
      />
    </>
  );
}

export default App;