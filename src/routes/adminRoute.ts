import express from "express";
import {
  registerAdmin,
  getAllUsers,
  getUserStats,
} from "../controllers/adminController";
import { protect, verifyAndAuthorizeAdmin } from "../middlewares/authorization";
import { upload } from "../utils/multer";

const router = express.Router();

router.get("/get-user-stats", protect, verifyAndAuthorizeAdmin, getUserStats);
router.get("/get-all-users", protect, verifyAndAuthorizeAdmin, getAllUsers);
router.post(
  "/create-admin",
  protect,
  verifyAndAuthorizeAdmin,
  upload.single("image"),
  registerAdmin
);

export default router;
