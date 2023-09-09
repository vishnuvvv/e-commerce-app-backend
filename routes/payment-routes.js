import express from "express";
import stripe from "stripe";

const paymentRouter = express.Router();
const stripeInstance = stripe(process.env.STRIPE_KEY);
paymentRouter.post("/payment", async (req, res) => {
  try {
    const charge = await stripeInstance.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "inr",
    });
    res.status(200).json(charge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment failed" });
  }
});

export default paymentRouter;
