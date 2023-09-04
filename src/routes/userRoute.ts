import express from "express";
import {
  Register,
  Login,
  updateUserProfile,
  deleteUser,
  getSingleUser,
} from "../controllers/userController";
import { protect, verifyAndAuthorize } from "../middlewares/authorization";
import { handlePayment } from "../controllers/paymentController";
import { upload } from "../utils/multer";

const router = express.Router();

router.post("/register", upload.single("image"), Register);
router.post("/login", Login);

router.get("/get-user/:id", protect, verifyAndAuthorize, getSingleUser);
router.put(
  "/update-profile/:id",
  protect,
  verifyAndAuthorize,
  upload.single("image"),
  updateUserProfile
);
router.delete("/delete-user/:id", protect, verifyAndAuthorize, deleteUser);
router.post("/pay", handlePayment);

export default router;
