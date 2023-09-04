import mongoose, { Schema } from "mongoose";

export interface OrderAttributes {
    products: Array<string | number>,
    amount: number,
    address: string,
    status: string
}

const userInfoSchema = new mongoose.Schema({
    userId: {type:String},
    username: {type:String},
    image:{type:String},
    firstName:{type:String},
    lastName: {type:String},
})

export const OrderSchema = new mongoose.Schema({
    products: [
        { 
            productId: {type: String},
            quantity: {type: Number, default: 1}, 
        }
    ],
    amount: {type: Number, required: true},
    address: {type: String, required: true},
    status: {type: String, default: "pending"},
    userInfo: userInfoSchema
}, {
    timestamps: true
});

const Order = mongoose.model<OrderAttributes>("Order", OrderSchema)

export default Order