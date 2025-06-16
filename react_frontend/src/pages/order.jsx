import { useOrderContext } from "../contexts/OrderContext";
import "../css/Order.css"; 

function Order() {
  const { orders, deleteOrder } = useOrderContext();

  return (
    <div className="order-page">
      <h2 className="order-heading">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => {
          const totalPrice = order.items.reduce((acc, item) => acc + item.price, 0);
          return (
            <div className="order-card" key={order._id}>
              <div className="order-details">
                <h4>Order #{index + 1}</h4>
                <p><strong>Cars:</strong> {order.items.map((item) => item.name).join(", ")}</p>
                <p><strong>Total Price:</strong> ₹{totalPrice}</p>
                <p><strong>Time:</strong> {new Date(order.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</p>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteOrder(order._id)}
              >
                🗑️
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Order;
