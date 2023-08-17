import express from "express"
import stripe from "stripe"

const paymentRouter = express.Router();
const stripeInstance = stripe(process.env.STRIPE_KEY);

paymentRouter.post("/payment", (req, res) => {
    stripeInstance.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "inr",
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).json(stripeErr)
        } else {
            res.status(200).json(stripeRes)
        }
    })
});

export default paymentRouter;