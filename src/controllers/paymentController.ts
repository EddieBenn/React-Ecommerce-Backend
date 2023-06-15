import { Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


export const handlePayment = async (req: Request, res: Response) => {
    try {
        stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount, 
            currency: "usd"
        },
        (stripeErr: any, stripeRes:any)=>{
            if(stripeErr) {
                return res.status(500).json({
                    Error: "An error occured while completing your payment"
                })
            } else{
                return res.status(200).json({
                    message: stripeRes
                })
            } 
        })
    } catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/pay",
          });
    }
}