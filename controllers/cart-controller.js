import Cart from "../models/Cart";

export const addToCart = async (req, res) => {
  const userId = req.body.uid;
  const productData = req.body.productData;
  try {
    const existingCart = await Cart.findOne({ userId });
    if (!existingCart) {
      const newCart = new Cart({ userId, products: [productData] });
      await newCart.save();
      res.status(201).json(newCart);
    } else {
      existingCart.products.push(productData);
      await existingCart.save();
      res.status(200).json(existingCart);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateCart = async (req, res) => {
  const id = req.params.id;
  const cartItemsDetails = req.body;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(id, cartItemsDetails);
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};
