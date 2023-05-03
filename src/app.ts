import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config';
import dotenv from 'dotenv';
import logger from 'morgan';
import userRoute from './routes/userRoute';
import adminRoute from './routes/adminRoute';
import productRoute from './routes/productRoute'
import cartRoute from './routes/cartRoute';
import orderRoute from './routes/orderRoute';


const app = express();


dotenv.config();
connectDB();

//Middleware
app.use(logger('dev'));
app.use(cors({
 origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', userRoute);
app.use('/api/users', adminRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);


app.listen(process.env.PORT, () => {
    console.log(`Server listening on PORT ${process.env.PORT}`);
})

export default app