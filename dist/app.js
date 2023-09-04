"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const cartRoute_1 = __importDefault(require("./routes/cartRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const stripeRoute_1 = __importDefault(require("./routes/stripeRoute"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, config_1.connectDB)();
//Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use('/api/users', userRoute_1.default);
app.use('/api/users', adminRoute_1.default);
app.use('/api/product', productRoute_1.default);
app.use('/api/cart', cartRoute_1.default);
app.use('/api/order', orderRoute_1.default);
app.use("/api/checkout", stripeRoute_1.default);
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});
exports.default = app;
