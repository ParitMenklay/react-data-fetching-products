import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4001/products");
      setProducts(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete product failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="App">
      <h1 className="app-title">Products</h1>

      <section className="product-list">
        {products.map((product) => (
          <article key={product.id} className="product">
            <img
              src={product.image}
              alt={product.name}
              width="350"
              height="350"
            />

            <h2>{product.name}</h2>
            <p>{product.price} Baht</p>
            <p>{product.description}</p>

            <button
              className="delete-button"
              onClick={() => handleDelete(product.id)}
            >
              x
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

export default App;