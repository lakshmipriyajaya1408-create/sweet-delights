import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    addToCart(product);

    // Open checkout/cart flow
    document.getElementById("cakes")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {product.emoji}
      </div>

      <p className="product-category">
        {product.category}
      </p>

      <h3>{product.name}</h3>

      <p className="product-description">
        {product.description}
      </p>

      <h2 className="product-price">
        ₹{product.price}
      </h2>

      <div className="product-buttons">

        <button
          className="add-cart-btn"
          onClick={() => addToCart(product)}
        >
          🛒 Add to Cart
        </button>

        <button
          className="buy-now-btn"
          onClick={handleBuyNow}
        >
          ⚡ Buy Now
        </button>

      </div>
    </div>
  );
}

export default ProductCard;