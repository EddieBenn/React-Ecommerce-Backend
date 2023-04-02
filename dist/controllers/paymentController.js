"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePayment = void 0;
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const handlePayment = async (req, res) => {
    try {
        stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd"
        }, (stripeErr, stripeRes) => {
            if (stripeErr) {
                return res.status(500).json({
                    Error: "An error occured while completing your payment"
                });
            }
            else {
                return res.status(200).json({
                    message: stripeRes
                });
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/pay",
        });
    }
};
exports.handlePayment = handlePayment;
