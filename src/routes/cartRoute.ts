import express from 'express';
import { protect, verifyAndAuthorize, verifyAndAuthorizeAdmin } from '../middlewares/authorization';
import { createCart, updateCart, deleteCart, getCartByUserId, getAllCartItems } from '../controllers/cartController';

const router = express.Router();

router.post("/add-to-cart", protect, createCart);
router.put("/update-cart/:id", protect, verifyAndAuthorize, updateCart);
router.delete("/delete-cart/:id", protect, verifyAndAuthorize, deleteCart);
router.get("/get-user-cart/:userId", protect, verifyAndAuthorize, getCartByUserId);


//Only admin can get all cart items
router.get("/get-all-cart-items", protect, verifyAndAuthorizeAdmin, getAllCartItems);


export default router
