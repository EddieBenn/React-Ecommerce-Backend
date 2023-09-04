"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const authorization_1 = require("../middlewares/authorization");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
router.get("/get-user-stats", authorization_1.protect, authorization_1.verifyAndAuthorizeAdmin, adminController_1.getUserStats);
router.get("/get-all-users", authorization_1.protect, authorization_1.verifyAndAuthorizeAdmin, adminController_1.getAllUsers);
router.post("/create-admin", authorization_1.protect, authorization_1.verifyAndAuthorizeAdmin, multer_1.upload.single("image"), adminController_1.registerAdmin);
exports.default = router;
