import Order from '../models/order.model.js';

// POST /api/order - Add new order
export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      userId: req.user._id,
      items: req.body.items,
    });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order' });
  }
};

// GET /api/order - Get all orders for the logged-in user
export const getOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('items');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// DELETE /api/orders/:id - Delete an order by ID
export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const deletedOrder = await Order.findOneAndDelete({
      _id: orderId,
      userId: req.user._id, // make sure user owns the order
    });

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found or unauthorized" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order" });
  }
};

