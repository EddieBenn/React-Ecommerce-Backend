"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.CartSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, unique: true },
    products: [
        {
            productId: { type: String },
            quantity: { type: Number, default: 1 },
        }
    ]
}, {
    timestamps: true
});
const Cart = mongoose_1.default.model("Cart", exports.CartSchema);
exports.default = Cart;
