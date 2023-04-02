"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../middlewares/authorization");
const cartController_1 = require("../controllers/cartController");
const router = express_1.default.Router();
router.post("/add-to-cart", authorization_1.protect, cartController_1.createCart);
router.put("/update-cart/:id", authorization_1.protect, authorization_1.verifyAndAuthorize, cartController_1.updateCart);
router.delete("/delete-cart/:id", authorization_1.protect, authorization_1.verifyAndAuthorize, cartController_1.deleteCart);
router.get("/get-user-cart/:userId", authorization_1.protect, authorization_1.verifyAndAuthorize, cartController_1.getCartByUserId);
//Only admin can get all cart items
router.get("/get-all-cart-items", authorization_1.protect, authorization_1.verifyAndAuthorizeAdmin, cartController_1.getAllCartItems);
exports.default = router;
