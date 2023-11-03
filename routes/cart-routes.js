import express from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verify-token";
import {
  addToCart,
  deleteCart,
  deleteSingleCartItem,
  getAllCarts,
  getUserCart,
  updateCart,
} from "../controllers/cart-controller";

const cartRouter = express.Router();

cartRouter.post("/add-cart", verifyToken, addToCart);
cartRouter.put("/update-cart/:id", verifyTokenAndAuthorization, updateCart);
cartRouter.delete(
  "/delete-cart/:userId",
  verifyTokenAndAuthorization,
  deleteCart
);
cartRouter.delete(
  "/delete-single-cart-item/:userId/:itemId",
  verifyTokenAndAuthorization,
  deleteSingleCartItem
);
cartRouter.get("/get-user-cart/:userId", getUserCart);
cartRouter.get("/get-all-carts", verifyTokenAndAdmin, getAllCarts);

export default cartRouter;
