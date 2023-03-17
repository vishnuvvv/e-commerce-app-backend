import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("data base connection is succesful"))
  .catch((err) => console.log(err));
  
app.listen(process.env.PORT || 5000 , () =>
  console.log("Backend server is running..!")
);

//wmT6YLf9mVL8Vv5j
