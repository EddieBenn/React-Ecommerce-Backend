"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authorization_1 = require("../middlewares/authorization");
const paymentController_1 = require("../controllers/paymentController");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
router.post("/register", multer_1.upload.single("image"), userController_1.Register);
router.post("/login", userController_1.Login);
router.get("/get-user/:id", authorization_1.protect, authorization_1.verifyAndAuthorize, userController_1.getSingleUser);
router.put("/update-profile/:id", authorization_1.protect, authorization_1.verifyAndAuthorize, multer_1.upload.single("image"), userController_1.updateUserProfile);
router.delete("/delete-user/:id", authorization_1.protect, authorization_1.verifyAndAuthorize, userController_1.deleteUser);
router.post("/pay", paymentController_1.handlePayment);
exports.default = router;
