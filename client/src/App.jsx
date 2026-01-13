import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // 1. สร้าง State เพื่อเก็บข้อมูล Products
  const [products, setProducts] = useState([]);

  // 2. ใช้ useEffect เพื่อเรียกข้อมูลตอนเข้าหน้าเว็บครั้งแรก
  useEffect(() => {
    getProducts();
  }, []);

  // ฟังก์ชันดึงข้อมูล (GET)
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4001/products");
      // จุดสังเกต: ใน server/app.js บรรทัด 99 ส่งมาเป็น res.json({ data: products })
      // ดังนั้นเวลา axios รับมา ข้อมูลจะซ้อนอยู่ที่ response.data.data
      setProducts(response.data.data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  };

  // ฟังก์ชันลบข้อมูล (DELETE)
  const handleDelete = async (id) => {
    try {
      // ยิง Request ไปลบที่ Server
      await axios.delete(`http://localhost:4001/products/${id}`);

      // อัปเดต State หน้าจอทันที (Client-side update)
      // กรองเอาเฉพาะตัวที่ id ไม่ตรงกับตัวที่ลบ เก็บไว้ใน State ใหม่
      const newProducts = products.filter((product) => product.id !== id);
      setProducts(newProducts);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {/* 3. ใช้ map เพื่อวนลูปแสดงข้อมูล */}
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