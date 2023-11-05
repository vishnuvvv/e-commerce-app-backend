import express from "express";
import { verifyToken, verifyTokenAndAdmin } from "../middlewares/verify-token";
import {
  addNewProduct,
  addWishlist,
  deleteProduct,
  getAllProducts,
  getAllWishlist,
  getProduct,
  removeWishlist,
  updateProduct,
} from "../controllers/product-controller";

const productRouter = express.Router();

productRouter.post("/add-product", verifyTokenAndAdmin, addNewProduct);
productRouter.put("/update-product/:id", verifyTokenAndAdmin, updateProduct);
productRouter.delete("/delete-product/:id", verifyTokenAndAdmin, deleteProduct);
productRouter.get("/get-product/:id", getProduct);
productRouter.get("/get-all-products", getAllProducts);

productRouter.post("/add/wishlist/:userId",addWishlist);
productRouter.delete("/delete/wishlist/userId", removeWishlist);
productRouter.get("/wishlist/getall/:id", getAllWishlist);
export default productRouter;
