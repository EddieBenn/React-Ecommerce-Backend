import express from "express";
import { protect, verifyAndAuthorizeAdmin } from "../middlewares/authorization";
import {
  getSingleProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { multerUploads } from "../utils/multerCloudinary";

const router = express.Router();

router.get("/get-product/:id", getSingleProduct);
router.get("/get-all-products", getAllProducts);
router.delete(
  "/delete-product/:id",
  protect,
  verifyAndAuthorizeAdmin,
  deleteProduct
);
router.post(
  "/create-product",
  protect,
  verifyAndAuthorizeAdmin,
  multerUploads.single("image"),
  createProduct
);
router.put(
  "/update-product/:id",
  protect,
  verifyAndAuthorizeAdmin,
  multerUploads.single("image"),
  updateProduct
);

export default router;
