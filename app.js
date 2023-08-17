import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth-routes";
import userRouter from "./routes/user-routes";
import productRouter from "./routes/product-routes";
import cartRouter from "./routes/cart-routes";
import orderRouter from "./routes/order-routes";

const app = express();
dotenv.config();
app.use(express.json())

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("data base connection is succesful"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () =>
  console.log("Backend server is running..!")
);


