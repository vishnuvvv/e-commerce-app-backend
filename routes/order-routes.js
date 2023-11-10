import express from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verify-token";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getIncomeData,
  getUserOrders,
  updateOrder,
  deleteProductFromOrder
} from "../controllers/order-controller";

const orderRouter = express.Router();

orderRouter.post("/create-order", verifyToken, createOrder);
orderRouter.get("/get-all", getAllOrders);
orderRouter.put("/update-order/:id", verifyTokenAndAdmin, updateOrder);
orderRouter.delete("/delete-order/:id", verifyTokenAndAdmin, deleteOrder);
orderRouter.get(
  "/get-user-orders/:id",
  verifyTokenAndAuthorization,
  getUserOrders
);
orderRouter.delete(
  "/delete-product-from-order/:id/:orderId/:productId",
  verifyTokenAndAuthorization,
  deleteProductFromOrder
);
orderRouter.get("/get-income", getIncomeData);

export default orderRouter;
