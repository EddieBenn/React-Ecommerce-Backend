import express from "express";
import { handlePayment } from "../controllers/paymentController";

const router = express.Router();


router.post("/", handlePayment)


export default router;