import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
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
  },
  { timestamps: true }
);


export default mongoose.model("Cart", cartSchema);
