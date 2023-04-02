"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../middlewares/authorization");
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
router.post("/create-order", authorization_1.protect, orderController_1.createOrder);
router.get("/get-user-orders/:userId", authorization_1.protect, authorization_1.verifyAndAuthorize, orderController_1.getUserOrders);
//Only admin can modify the order
router.put("/update-order/:id", authorization_1.protect, authorization_1.verifyAndAuthorizeAdmin, orderController_1.updateOrder);
router.delete("/delete-order/:id", authorization_1.protect, authorization_1.verifyAndAuthorizeAdmin, orderController_1.deleteOrder);
router.get("/get-all-orders", authorization_1.protect, authorization_1.verifyAndAuthorizeAdmin, orderController_1.getAllOrders);
router.get("/get-monthly-stats", authorization_1.protect, authorization_1.verifyAndAuthorizeAdmin, orderController_1.getMonthlyStats);
exports.default = router;
