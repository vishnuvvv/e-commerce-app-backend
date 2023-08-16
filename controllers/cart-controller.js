import Cart from "../models/Cart"

export const addToCart = async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (err) {
        res.status(500).json(err)
    }
}

export const updateCart = async (req, res) => {
    const id = req.params.id;
    const cartItemsDetails = re.body;
    try {
        const updatedCart = await Cart.findByIdAndUpdate(id, cartItemsDetails)
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted!")
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err);
    }
}