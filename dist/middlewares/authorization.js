"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAndAuthorizeAdmin = exports.verifyAndAuthorize = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const userModel_1 = __importDefault(require("../models/userModel"));
const protect = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({
                Error: 'Kindly login'
            });
        }
        //Verify token
        const token = authorization.split(' ')[1];
        let verified = await jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({
                Error: "unauthorized"
            });
        }
        const { _id } = verified;
        //Find the user by id
        const user = await userModel_1.default.findOne({ _id });
        if (!user) {
            return res.status(401).json({
                Error: "Invalid token"
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({
            Error: "Unauthorized"
        });
    }
};
exports.protect = protect;
//**==== Verify and Authorize a User to Update and Delete Profile ====**/
const verifyAndAuthorize = async (req, res, next) => {
    if (req.user._id === req.params.id || req.user.role === "admin") {
        next();
    }
    else {
        return res.status(401).json({
            Error: "You do not have permission to do that"
        });
    }
};
exports.verifyAndAuthorize = verifyAndAuthorize;
//**==== Verify and Authorize if User is Admin ====**/
const verifyAndAuthorizeAdmin = async (req, res, next) => {
    if (req.user.role === "admin") {
        next();
    }
    else {
        return res.status(401).json({
            Error: "Only admins have the permission to do that"
        });
    }
};
exports.verifyAndAuthorizeAdmin = verifyAndAuthorizeAdmin;
