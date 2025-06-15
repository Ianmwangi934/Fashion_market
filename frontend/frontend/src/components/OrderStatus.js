import React, {useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import './OrderStatus.css';
import { useNavigate } from "react-router-dom";



const OrderStatus = () =>{
    const {id} = useParams();
    const [order, setOrder] = useState();
    const navigate = useNavigate(); 

    useEffect(()=>{
      if (!id) {
        console.log("No order id provided in the URL");
        return;
      }

      fetch(`http://127.0.0.1:8000/store/order/${id}/`,{
          method: "GET",
          headers :{
              "Authorization" :`Bearer ${localStorage.getItem("access_token")}`,
              "content-type": "application/json"
          }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Http error ${res.status}`);
        }
        return res.json();
      })
      .then(data =>{
          console.log("Order data:", data); 
          setOrder(data);
          
              
          
      })
      .catch(error => console.error("Order fetch failed:", error))
  },[id]);
    if (!order) return <p>Loading...</p>;
    

    return (
      <div className="order-confirmation">
      <h2>Order Confirmed!</h2>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Items:</strong></p>
      <ul className="order-items-list">
      {order.items.map((item, index) => {
    const imageUrl = item.product.image?.startsWith("http")
      ? item.product.image
      : `http://127.0.0.1:8000${item.product.image}`;

    return (
      <li key={index} className="order-item">
        <img
          src={imageUrl}
          alt={item.product.name}
          className="order-item-image"
        />
        <div className="order-item-details">
          <p className="order-item-name">{item.product.name}</p>
          <p>{item.quantity} pcs</p>
          <p>${item.price}</p>
        </div>
      </li>
    );
  })}
      </ul>
      <button 
      onClick={() => navigate(`/checkout/${order.id}`)}
      >Proceed to Checkout</button>
    </div>
      );
};
export default OrderStatus;