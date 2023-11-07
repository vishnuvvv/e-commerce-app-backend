import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, requied: true },
    products: [
      {
        _id: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        size: [{ type: String }],
        instok: {
          type: String,
        },
        title: {
          type: String,
        },
        img: {
          type: String,
        },
        color: {
          type: String,
        },
        desc: {
          type: String,
        },
        categories: [{ type: String }],
        price: { type: Number },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
