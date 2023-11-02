import express from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verify-token";
import {
  addToCart,
  deleteCart,
  getAllCarts,
  getUserCart,
  updateCart,
} from "../controllers/cart-controller";

const cartRouter = express.Router();

cartRouter.post("/add-cart", verifyToken, addToCart);
cartRouter.put("/update-cart/:id", verifyTokenAndAuthorization, updateCart);
cartRouter.delete("/delete-cart/:id", verifyTokenAndAuthorization, deleteCart);
cartRouter.get("/get-user-cart/:userId", getUserCart);
cartRouter.get("/get-all-carts", verifyTokenAndAdmin, getAllCarts);

export default cartRouter;
