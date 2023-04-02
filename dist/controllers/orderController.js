"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthlyStats = exports.getAllOrders = exports.getUserOrders = exports.deleteOrder = exports.updateOrder = exports.createOrder = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const createOrder = async (req, res) => {
    try {
        const { userId, products, amount, address, status } = req.body;
        const orderedProduct = await orderModel_1.default.create({
            userId, products, amount, address, status
        });
        return res.status(200).json({
            message: "Order Successfully created",
            orderedProduct
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/create-order"
        });
    }
};
exports.createOrder = createOrder;
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrder = await orderModel_1.default.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });
        return res.status(200).json({
            message: "Successfully updated order details",
            updatedOrder
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/update-order/:id"
        });
    }
};
exports.updateOrder = updateOrder;
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await orderModel_1.default.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Order successfully deleted",
            deletedOrder
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/delete-order/:id"
        });
    }
};
exports.deleteOrder = deleteOrder;
/**================= Get user orders =================**/
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const getUserOrders = await orderModel_1.default.find({ userId });
        return res.status(200).json({
            message: "Successfully fetched user orders",
            getUserOrders
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/get-user-orders/:userId",
        });
    }
};
exports.getUserOrders = getUserOrders;
/**================= Get all orders =================**/
const getAllOrders = async (req, res) => {
    try {
        const getOrders = await orderModel_1.default.find();
        return res.status(200).json({
            message: "Successfully fetched all orders",
            getOrders,
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/get-all-orders"
        });
    }
};
exports.getAllOrders = getAllOrders;
/** ================ Get Monthly Sales Statistics ================== **/
const getMonthlyStats = async (req, res) => {
    try {
        const date = new Date();
        //Getting last month's date 
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        //To get the month before last month
        const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
        //We use $match to check the year, then project to get the particular month
        const income = await orderModel_1.default.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            { $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        return res.status(200).json({
            message: "Successfully fetched income statistics",
            income
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/get-monthly-stats",
        });
    }
};
exports.getMonthlyStats = getMonthlyStats;
