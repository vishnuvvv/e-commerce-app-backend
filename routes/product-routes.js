import express from "express"
import { verifyTokenAndAdmin } from "../middlewares/verify-token";
import { addNewProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product-controller";

const productRouter = express.Router()

productRouter.post("/add-product", verifyTokenAndAdmin, addNewProduct);
productRouter.put("/update-product/:id", verifyTokenAndAdmin, updateProduct);
productRouter.delete("/delete-product/:id", verifyTokenAndAdmin, deleteProduct);
productRouter.get("/get-product/:id", getProduct);
productRouter.get("/get-all-products", getAllProducts)
export default productRouter;