import express from 'express';
import { protect, verifyAndAuthorize, verifyAndAuthorizeAdmin } from '../middlewares/authorization';
import { createOrder, updateOrder, deleteOrder, getUserOrders, getAllOrders, getMonthlyStats } from '../controllers/orderController';

const router = express.Router();

router.post("/create-order", protect, createOrder);
router.get("/get-user-orders/:id", protect, verifyAndAuthorize, getUserOrders);


//Only admin can modify the order
router.put("/update-order/:id", protect, verifyAndAuthorizeAdmin, updateOrder);
router.delete("/delete-order/:id", protect, verifyAndAuthorizeAdmin, deleteOrder);
router.get("/get-all-orders", protect, verifyAndAuthorizeAdmin, getAllOrders);
router.get("/get-monthly-stats", protect, verifyAndAuthorizeAdmin, getMonthlyStats);


export default router

