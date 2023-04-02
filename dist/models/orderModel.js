"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.OrderSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, unique: true },
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 },
        }
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" }
}, {
    timestamps: true
});
const Order = mongoose_1.default.model("Order", exports.OrderSchema);
exports.default = Order;
