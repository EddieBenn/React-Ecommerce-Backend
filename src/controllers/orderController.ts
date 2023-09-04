import { Request, Response } from "express";
import Order from "../models/orderModel";
import { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";

export const createOrder = async (req: JwtPayload, res: Response) => {
  try {
    const id = req.user._id;

    const { products, amount, address } = req.body;
    const user = await User.findOne(id);

    const orderedProduct = await Order.create({
      products,
      amount,
      address,
      userInfo: {
        userId: id,
        username: user?.username,
        firstName: user?.firstName,
        lastName: user?.lastName,
        image: user?.image,
      },
    });

    return res.status(200).json({
      message: "Order Successfully created",
      orderedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Internal Server Error",
      route: "/create-order",
    });
  }
};

export const updateOrder = async (req: JwtPayload, res: Response) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Successfully updated order details",
      updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Internal Server Error",
      route: "/update-order/:id",
    });
  }
};

export const deleteOrder = async (req: JwtPayload, res: Response) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Order successfully deleted",
      deletedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Internal Server Error",
      route: "/delete-order/:id",
    });
  }
};

/**================= Get user orders =================**/

export const getUserOrders = async (req: JwtPayload, res: Response) => {
  try {
    const id = req.params.id;
    const orders = await Order.find({ id });
    return res.status(200).json({
      message: "Successfully fetched user orders",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Internal Server Error",
      route: "/get-user-orders/:userId",
    });
  }
};

/**================= Get all orders =================**/

export const getAllOrders = async (req: JwtPayload, res: Response) => {
  try {
    const orders = await Order.find();
    return res.status(200).json({
      message: "Successfully fetched all orders",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Internal Server Error",
      route: "/get-all-orders",
    });
  }
};

/** ================ Get Monthly Sales Statistics ================== **/

export const getMonthlyStats = async (req: Request, res: Response) => {
  try {
    const productId = req.query.productId;
    const date = new Date();

    //Getting last month's date
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));

    //To get the month before last month
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

    //We use $match to check the year, then project to get the particular month
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && { products: { 
            $elemMatch: { productId } },
         }),
        },
      },
      {
        $project: {
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
      income,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Internal Server Error",
      route: "/get-monthly-stats",
    });
  }
};
