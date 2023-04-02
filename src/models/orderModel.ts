import mongoose from "mongoose";

export interface OrderAttributes {
    userId: string,
    products: Array<string | number>,
    amount: number,
    address: {},
    status: string
}

export const OrderSchema = new mongoose.Schema({
    userId: {type: String, required: true, unique: true},
    products: [
        { 
            productId: {type: String},
            quantity: {type: Number, default: 1}, 
        }
    ],
    amount: {type: Number, required: true},
    address: {type: Object, required: true},
    status: {type: String, default: "pending"}
}, {
    timestamps: true
});

const Order = mongoose.model<OrderAttributes>("Order", OrderSchema)

export default Order