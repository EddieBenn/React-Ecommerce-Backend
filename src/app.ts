import express from 'express';
import cors from 'cors';
import { connectDB } from './config';
import dotenv from 'dotenv';
import logger from 'morgan';
import userRoute from './routes/userRoute';
import adminRoute from './routes/adminRoute';
import productRoute from './routes/productRoute'
import cartRoute from './routes/cartRoute';
import orderRoute from './routes/orderRoute';
import paymentRoute from './routes/stripeRoute';


const app = express();


dotenv.config();
connectDB();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cors({
 origin: "*"
}));

app.use('/api/users', userRoute);
app.use('/api/users', adminRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
app.use("/api/checkout", paymentRoute)

const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
})

export default app