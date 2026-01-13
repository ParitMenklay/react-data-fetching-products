import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // 1. เก็บข้อมูลสินค้า
  const [products, setProducts] = useState([]);
  
  // 2. (เพิ่มใหม่) เก็บสถานะการโหลด: "loading", "complete", "failed"
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      // เริ่มต้นโหลด (จริงๆ default เป็น loading อยู่แล้ว แต่ใส่เพื่อความชัวร์)
      setStatus("loading");
      
      const response = await axios.get("http://localhost:4001/products");
      
      setProducts(response.data.data);
      
      // (เพิ่มใหม่) เมื่อได้ข้อมูลแล้ว เปลี่ยนสถานะเป็น complete
      setStatus("complete");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      // (เพิ่มใหม่) เมื่อ error เปลี่ยนสถานะเป็น failed
      setStatus("failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      const newProducts = products.filter((product) => product.id !== id);
      setProducts(newProducts);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
    }
  };

  // -------------------------------------------------
  // ส่วนแสดงผลตามสถานะ (Logic ของ Exercise #3)
  // -------------------------------------------------

  // ถ้าสถานะเป็น loading ให้โชว์คำว่า Loading...
  if (status === "loading") {
    return (
      <div className="App">
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>Loading...</h1>
      </div>
    );
  }

  // ถ้าสถานะเป็น failed ให้โชว์คำว่า Fetching Error...
  if (status === "failed") {
    return (
      <div className="App">
        <h1 style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
          Fetching Error...
        </h1>
      </div>
    );
  }

  // ถ้าสถานะเป็น complete ให้โชว์รายการสินค้าตามปกติ
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
                  alt={product.name}
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
                onClick={() => handleDelete(product.id)}
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