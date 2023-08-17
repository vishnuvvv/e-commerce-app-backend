import express from "express"
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verify-token";
import { createOrder, deleteOrder, getIncomeData, getUserOrders, updateOrder } from "../controllers/order-controller";

const orderRouter = express.Router();


orderRouter.post("/create-order", verifyToken, createOrder);
orderRouter.put("/update-order/:id", verifyTokenAndAdmin, updateOrder);
orderRouter.delete("/delete-order/:id", verifyTokenAndAdmin, deleteOrder);
orderRouter.get("/get-user-orders/:userId", verifyTokenAndAuthorization, getUserOrders);
orderRouter.get("/get-income",verifyTokenAndAdmin, getIncomeData);
export default orderRouter;