"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCartItems = exports.getCartByUserId = exports.deleteCart = exports.updateCart = exports.createCart = void 0;
const cartModel_1 = __importDefault(require("../models/cartModel"));
const createCart = async (req, res) => {
    try {
        const { products } = req.body;
        const newCart = await cartModel_1.default.create({
            products
        });
        newCart.save();
        return res.status(200).json({
            message: "Product added to cart",
            newCart
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/add-to-cart"
        });
    }
};
exports.createCart = createCart;
const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCart = await cartModel_1.default.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });
        return res.status(200).json({
            message: "Successfully updated cart details",
            updatedCart
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/update-cart/:id",
        });
    }
};
exports.updateCart = updateCart;
/**================= Delete a cart item =================**/
const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCart = await cartModel_1.default.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Cart item successfully deleted",
            deletedCart
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/delete-cart/:id",
        });
    }
};
exports.deleteCart = deleteCart;
/**================= Get user cart =================**/
const getCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const getUserCart = await cartModel_1.default.findOne({ userId });
        return res.status(200).json({
            message: "Successfully fetched user cart",
            getUserCart
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/get-user-cart/:userId",
        });
    }
};
exports.getCartByUserId = getCartByUserId;
/**================= Get all cart items =================**/
const getAllCartItems = async (req, res) => {
    try {
        const getCartItems = await cartModel_1.default.find();
        return res.status(200).json({
            message: "Successfully fetched all cart items",
            getCartItems,
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/get-all-cart-items"
        });
    }
};
exports.getAllCartItems = getAllCartItems;
