import { Request, Response } from 'express';
import Order from '../models/orderModel';


export const createOrder = async(req: Request, res: Response) => {
    try {
        const { userId, products, amount, address, status  } = req.body
        const orderedProduct = await Order.create({
            userId, products, amount, address, status
        })
        return res.status(200).json({
            message: "Order Successfully created",
            orderedProduct

        })
    } catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/create-order"
          });
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const updatedOrder = await Order.findByIdAndUpdate(id, {
            $set: req.body
        }, {new: true})

        return res.status(200).json({
            message: "Successfully updated order details",
            updatedOrder
        })
    } catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/update-order/:id"
          });
    }
}

export const deleteOrder = async (req: Request, res: Response) => {
    try{
        const { id } = req.params
        const deletedOrder = await Order.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Order successfully deleted",
            deletedOrder
        })
    } catch(error){
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/delete-order/:id"
          });
    }
}

/**================= Get user orders =================**/

export const getUserOrders = async(req: Request, res: Response)=>{
    try{
        const { userId } = req.params
        const getUserOrders = await Order.find({ userId })
        return res.status(200).json({
            message: "Successfully fetched user orders",
            getUserOrders
        })
    } catch(error){
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/get-user-orders/:userId",
          });
    }
}

/**================= Get all orders =================**/

export const getAllOrders = async (req: Request, res: Response) => {
    try{
        const getOrders = await Order.find()
        return res.status(200).json({
            message: "Successfully fetched all orders",
            getOrders,
        })
    } catch(error){
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/get-all-orders"
          });
    }
}

/** ================ Get Monthly Sales Statistics ================== **/

export const getMonthlyStats = async (req: Request, res: Response) => {
    try {
    const date = new Date()
  
    //Getting last month's date 
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));

    //To get the month before last month
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() -1));

    //We use $match to check the year, then project to get the particular month
    const income =  await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        { $project:{
                    month: { $month: "$createdAt" },
                    sales: "$amount",
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" },
            },
        },
    ]);
    return res.status(200).json({
        message: "Successfully fetched income statistics",
        income
    })

    } catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/get-monthly-stats",
          });
    }
}