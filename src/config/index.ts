import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        const connection = mongoose.connect(`${process.env.MONGO_URI}`, () => {
            console.log('MongoDB connected');
        })
    } catch (error) {
        console.log(error);
    }
}

export const JWT_SECRET = process.env.JWT_SECRET!