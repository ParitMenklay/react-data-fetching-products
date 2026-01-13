import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
function App() {
  const [products, setProduct] = useState([]);

  const getData = async () => {
    const response = await axios.get("http://localhost:4001/products");
    setProduct(response.data.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    getData();
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products.map((product) => {
          return (
            <div className="product" key={product.id}>
              <div className="product-preview">
                <img
                  src={product.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price} Baht</h2>
                <p>Product description: {product.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deleteProduct(product.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
