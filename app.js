import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth-routes";

const app = express();
dotenv.config();
app.use(express.json())

app.use("/api/auth",authRouter)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("data base connection is succesful"))
  .catch((err) => console.log(err));
  
app.listen(process.env.PORT || 5000 , () =>
  console.log("Backend server is running..!")
);  

//wmT6YLf9mVL8Vv5j
