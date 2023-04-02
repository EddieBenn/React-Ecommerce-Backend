import mongoose, { Schema } from "mongoose";

export interface ProductAttributes {
    title: string,
    description: string,
    categories: Array<string>,
    size: string,
    color: string,
    prize: number
    adminId: string,
    image: string,
}

export const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    categories: {type: Array<string>},
    size: {type: String},
    color: {type: String},
    prize: {type: Number},
    adminId: {type: Schema.Types.ObjectId, ref: "User"},
    image: {type: String},
}, {
    timestamps: true
});

const Product = mongoose.model<ProductAttributes>("Product", ProductSchema)

export default Product