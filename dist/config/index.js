"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.connectDB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        mongoose_1.default.set('strictQuery', true);
        const connection = mongoose_1.default.connect(`${process.env.MONGO_URI}`, () => {
            console.log('MongoDB connected');
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectDB = connectDB;
exports.JWT_SECRET = process.env.JWT_SECRET;
