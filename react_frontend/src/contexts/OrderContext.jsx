import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const OrderContext = createContext();
export const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token")
  const isLoggedIn = !!token;

  // Fetch orders for logged-in users
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isLoggedIn) return;

      try {
        const res = await axios.get("https://car-rental-y1mj.onrender.com/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, [isLoggedIn]);

  // Place a new order
  const placeOrder = async (items) => {
    if (!isLoggedIn) return;

    try {
      await axios.post(
        "https://car-rental-y1mj.onrender.com/api/orders",
        { items },
        {
          headers: { Authorization: `Bearer ${token}` },
        });
      // Refresh orders after placing one
      const updated = await axios.get("https://car-rental-y1mj.onrender.com/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(updated.data);
    } catch (err) {
      console.error("Failed to place order:", err);
    }
  };

  // Delete an order
const deleteOrder = async (orderId) => {
  try {
    await axios.delete(`https://car-rental-y1mj.onrender.com/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Update local state
    setOrders((prev) => prev.filter((order) => order._id !== orderId));
  } catch (err) {
    console.error("Failed to delete order:", err);
  }
};


  return (
    <OrderContext.Provider value={{ orders, placeOrder, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
