import Order from "../models/Order";

export const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateOrder = async (req, res) => {
  const id = req.params.id;
  const orderDetails = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, orderDetails);
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getIncomeData = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && { products: { $elemMatch: { productId } } }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteProductFromOrder = async (req, res) => {
  const { id, orderId, productId } = req.params;
  const userId = id;

  try {
    // Find the order document by userId
    const order = await Order.findById(orderId);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Find the index of the product in the products array
    const productIndex = order.products.findIndex(
      (product) => product._id === productId
    );

    // Check if the product with the given productId exists
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Product not found in the order" });
    }

    // Store the removed product in a variable
    const removedProduct = order.products[productIndex];

    // Remove the product from the products array
    order.products.splice(productIndex, 1);

    // Update the amount in the order (assuming price is present in each product)
    order.amount -= removedProduct.price;

    // Save the updated order document
    await order.save();

    // If the products array is empty, delete the entire document
    if (order.products.length === 0) {
      await Order.findOneAndDelete({ userId });
      return res.json({ message: "Order deleted as it became empty" });
    }

    return res.json({ message: "Product deleted from the order", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
