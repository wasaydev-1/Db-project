// UserOrders.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserOrders.scss"; // Import the generated Sass styles

const History = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch user orders based on the provided userId
    const { id } = JSON.parse(sessionStorage.getItem("userdetails"));

    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/${id}`
        );
        const flattenedOrders = [];

        response.data.forEach((order) => {
          order.items.forEach((item) => {
            flattenedOrders.push({
              order_id: order.order_id,
              user_id: order.user_id,
              order_date: order.order_date,
              total_amount: item.total_price,
              product_id: item.product_id,
              productname: item.productname,
              quantity: item.quantity,
            });
          });
        });
        setOrders(flattenedOrders);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchUserOrders();
  }, [userId]);
  console.log("orders ", orders);
  return (
    <div>
      <h1>User Orders</h1>
      <table className="orders-table">
        {/* Table header */}
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.order_date}</td>
              <td>{order.product_id}</td>
              <td>{order.productname}</td>
              <td>{order.quantity}</td>
              <td>{order.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
