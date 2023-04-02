import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";

/** ================= Register Admin ===================== **/

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { username, email, password, firstName, lastName, phone } = req.body;

    // check if the admin exist
    const admin = await User.findOne({ email });
    if (admin) {
      return res.status(400).json({
        Error: "Admin already exist, use a different email and username",
      });
    }

    //Encrypt Password
    const adminPassword = await bcrypt.hash(password, 10);

    //Create Admin
    const newAdmin = await User.create({
      username,
      firstName,
      lastName,
      phone,
      email,
      password: adminPassword,
      role: "admin",
    });

    newAdmin.save();

    return res.status(200).json({
      message: "Admin successfully registered",
      username: newAdmin.username,
      firstName: newAdmin.firstName,
      lastName: newAdmin.lastName,
      phone: newAdmin.phone,
      email: newAdmin.email,
      role: newAdmin.role,
      _id: newAdmin._id,
    });
  } catch (error) {
    return res.status(400).json({
      Error: "An error occurred while registering admin",
      error,
    });
  }
};

/** ================= Get All Users ===================== **/

export const getAllUsers = async (req: Request, res: Response) => {
  try {
  
     //Enabling limit on req.query
     const query = req.query.new

     //Sorting in descending order
     const users = query ? await User.find().sort({_id: 1}).limit(2) : await User.find()

    if (users) {
      return res.status(200).json({
        message: "Successfully fetched all users",
        users
      });
    } else {
      return res.status(400).json({
        message: "An error occured, users not found",
      });
    }
  } catch (error) {
      return res.status(500).json({
      Error: "Internal Server Error",
      route: "/get-all-users",
    });
  }
};

/** ================ Get User Statistics ================== **/

export const getUserStats = async (req: Request, res: Response) => {
  const date = new Date();
  
  //Getting last year's date 
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

   //We use $match to check the year, then project to get the month
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear }}},
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 }
        },
      },
    ]);

    return res.status(200).json({
      message: "Successfully fetched users statistics",
      data
    });

  } catch (error) {
      return res.status(500).json({
      Error: "Internal Server Error",
      route: "/get-user-stats",
    });
  }
};
