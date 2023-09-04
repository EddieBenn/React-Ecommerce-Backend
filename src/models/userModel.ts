import mongoose from "mongoose";

export interface UserAttributes {
    _id: string,
    username: string,
    firstName: string,
    lastName: string,
    phone: number,
    email: string,
    password: string,
    role: string,
    image: string,

}

export const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: Number, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true },
    role: {type: String},
    image: {type: String},
    }, {
        timestamps: true
    });

const User = mongoose.model<UserAttributes>("User", UserSchema)

export default User