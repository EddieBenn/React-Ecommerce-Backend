import mongoose from "mongoose";

export interface CartAttributes {
    userId: string,
    products: Array<string | number>,
}

export const CartSchema = new mongoose.Schema({
    userId: {type: String, required: true, unique: true},
    products: [
        { 
            productId: {type: String},
            quantity: {type: Number, default: 1}, 
        }
    ]
}, {
    timestamps: true
});

const Cart = mongoose.model<CartAttributes>("Cart", CartSchema)

export default Cart