import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import StorePage from "./components/StorePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShippingForm from "./components/ShippingForm";
import PlaceORder from "./components/PlaceOrder";
import OrderStatus from "./components/OrderStatus";


function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <Link to="/upload" style={{ marginRight: "1rem" }}>Upload Product</Link>
        <Link to="/products" style={{ marginRight: "1rem" }}>View Products</Link>
        <Link to="/cart" style={{marginRight: "1rem"}}>Cart</Link>
        <Link to="/shipping" style={{marginRight: "1rem"}}>Shipping Information</Link>
        <Link to="/placeorder" style={{marginRight: "1rem"}}>Place Order</Link>
        <Link to="/order-status" style={{marginRight: "1rem"}}>Order status</Link>
        <Link to="/login" style={{marginRight: "1rem"}}>Login</Link>
        <Link to="/register">Register</Link>
        
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/upload" element={<ProductForm />} />
        <Route path="/products" element={<StorePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shipping" element={<ShippingForm  />} />
        <Route path="/placeorder" element={<PlaceORder />} />
        <Route path="/order-status/:id" element={<OrderStatus />} />
        
        
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}

export default App;
