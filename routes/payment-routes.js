import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const paymentRouter = express.Router();
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

paymentRouter.post("/payment", async (req, res) => {
  const { products } = req.body;

  const line_items = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: { name: product.title },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: line_items,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.json({ id: session.id });
});

export default paymentRouter;
