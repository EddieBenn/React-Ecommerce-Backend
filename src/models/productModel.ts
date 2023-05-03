import mongoose, { Schema } from "mongoose";

export interface ProductAttributes {
    title: string,
    description: string,
    categories: Array<string>,
    size: Array<string>,
    color: Array<string>,
    prize: number
    adminId: string,
    image: string,
    inStock: boolean,
}

export const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    categories: {type: Array<string>},
    size: {type: Array},
    color: {type: Array},
    prize: {type: Number},
    adminId: {type: Schema.Types.ObjectId, ref: "User"},
    image: {type: String},
    inStock: {type: Boolean, default: true},
}, {
    timestamps: true
});

const Product = mongoose.model<ProductAttributes>("Product", ProductSchema)

export default Product