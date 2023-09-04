"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userInfoSchema = new mongoose_1.default.Schema({
    userId: { type: String },
    username: { type: String },
    image: { type: String },
    firstName: { type: String },
    lastName: { type: String },
});
exports.OrderSchema = new mongoose_1.default.Schema({
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 },
        }
    ],
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "pending" },
    userInfo: userInfoSchema
}, {
    timestamps: true
});
const Order = mongoose_1.default.model("Order", exports.OrderSchema);
exports.default = Order;
