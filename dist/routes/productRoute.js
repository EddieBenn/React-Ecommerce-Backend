"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../middlewares/authorization");
const productController_1 = require("../controllers/productController");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
router.get("/get-product/:id", productController_1.getSingleProduct);
router.get("/get-all-products", productController_1.getAllProducts);
router.delete("/delete-product/:id", authorization_1.protect, authorization_1.verifyAndAuthorizeAdmin, productController_1.deleteProduct);
router.post("/create-product", authorization_1.protect, authorization_1.verifyAndAuthorizeAdmin, multer_1.multerUploads.single('image'), productController_1.createProduct);
router.put("/update-product/:id", authorization_1.protect, authorization_1.verifyAndAuthorizeAdmin, multer_1.multerUploads.single('image'), productController_1.updateProduct);
exports.default = router;
