"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserProfile = exports.getSingleUser = exports.Login = exports.Register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
/**======================== Register ===========================**/
const Register = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, phone } = req.body;
        // check if the user exist
        const user = await userModel_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({
                Error: "User already exist, use a different email and username",
            });
        }
        //Encrypt Password
        const userpassword = await bcrypt_1.default.hash(password, 10);
        //Create User
        const newUser = await userModel_1.default.create({
            username,
            firstName,
            lastName,
            phone,
            email,
            password: userpassword,
            role: "user"
        });
        newUser.save();
        return res.status(200).json({
            message: "User successfully registered",
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            phone: newUser.phone,
            email: newUser.email,
            role: newUser.role,
            _id: newUser._id,
        });
    }
    catch (error) {
        return res.status(400).json({
            Error: "An error occurred while registering user",
            error,
        });
    }
};
exports.Register = Register;
/**============================ Login ==========================**/
const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // check if the user exist
        const user = await userModel_1.default.findOne({ username });
        if (user && (await bcrypt_1.default.compare(password, user.password))) {
            const { _id, email, role } = user;
            const token = jsonwebtoken_1.default.sign({ _id, email, role }, config_1.JWT_SECRET, {
                expiresIn: "3d",
            });
            //Omit password when sending response
            return res.status(200).json({
                message: "Login successful",
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                role: user.role,
                _id: user._id,
                token,
            });
        }
        else {
            return res.status(400).json({
                Error: "Invalid username or password",
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            Error: "An error occured while logging user in",
            error,
        });
    }
};
exports.Login = Login;
//**==================== PROFILE =======================**/
const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel_1.default.findById(id);
        //Omit password when sending response
        if (user) {
            return res.status(200).json({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                role: user.role,
                _id: user._id,
            });
        }
        else {
            return res.status(400).json({
                message: "User not found",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal server Error",
            route: "/get-user",
        });
    }
};
exports.getSingleUser = getSingleUser;
const updateUserProfile = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await userModel_1.default.findByIdAndUpdate(id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone
        }, {
            new: true,
        });
        if (updatedUser) {
            const user = await userModel_1.default.findById(id);
            return res.status(201).json({
                message: "You have successfully updated your profile",
                user
            });
        }
        else {
            return res.status(400).json({
                Error: "An error occured",
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal server Error",
            route: "/update-profile/:id",
        });
    }
};
exports.updateUserProfile = updateUserProfile;
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await userModel_1.default.findByIdAndDelete(id);
        if (deletedUser) {
            return res.status(200).json({
                message: "User has been successfully deleted",
            });
        }
        else {
            return res.status(400).json({
                Error: "An error occured",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/delete-user/:id",
        });
    }
};
exports.deleteUser = deleteUser;
