"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStats = exports.getAllUsers = exports.registerAdmin = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
/** ================= Register Admin ===================== **/
const registerAdmin = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, phone, image } = req.body;
        // check if the admin exist
        const admin = await userModel_1.default.findOne({ email });
        if (admin) {
            return res.status(400).json({
                Error: "Admin already exist, use a different email and username",
            });
        }
        //Encrypt Password
        const adminPassword = await bcrypt_1.default.hash(password, 10);
        //Create Admin
        const newAdmin = await userModel_1.default.create({
            username,
            firstName,
            lastName,
            phone,
            email,
            password: adminPassword,
            role: "admin",
            image: req.file,
        });
        newAdmin.save();
        return res.status(200).json({
            message: "Admin successfully registered",
            username: newAdmin.username,
            firstName: newAdmin.firstName,
            lastName: newAdmin.lastName,
            phone: newAdmin.phone,
            email: newAdmin.email,
            role: newAdmin.role,
            _id: newAdmin._id,
            image: newAdmin.image,
        });
    }
    catch (error) {
        return res.status(400).json({
            Error: "An error occurred while registering admin",
            error,
        });
    }
};
exports.registerAdmin = registerAdmin;
/** ================= Get All Users ===================== **/
const getAllUsers = async (req, res) => {
    try {
        //Enabling limit on req.query
        const query = req.query.new;
        //Sorting in descending order
        const users = query ? await userModel_1.default.find().sort({ _id: 1 }).limit(5) : await userModel_1.default.find();
        if (users) {
            return res.status(200).json({
                message: "Successfully fetched all users",
                users
            });
        }
        else {
            return res.status(400).json({
                message: "An error occured, users not found",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/get-all-users",
        });
    }
};
exports.getAllUsers = getAllUsers;
/** ================ Get User Statistics ================== **/
const getUserStats = async (req, res) => {
    const date = new Date();
    //Getting last year's date 
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    //We use $match to check the year, then project to get the month
    try {
        const userData = await userModel_1.default.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                },
            },
        ]);
        return res.status(200).json({
            message: "Successfully fetched users statistics",
            userData
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/get-user-stats",
        });
    }
};
exports.getUserStats = getUserStats;
