import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import Product from "../models/productModel";


/**======================== Register ===========================**/
export const Register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, firstName, lastName, phone } = req.body;

    // check if the user exist
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        Error: "User already exist, use a different email and username",
      });
    }

    //Encrypt Password
    const userpassword = await bcrypt.hash(password, 10);

    //Create User
    const newUser = await User.create({
      username,
      firstName,
      lastName,
      phone,
      email,
      password: userpassword,
      role: "user"
    });

    newUser.save();

    return res.status(200).json({
      message: "User successfully registered",
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phone: newUser.phone,
      email: newUser.email,
      role: newUser.role,
      _id: newUser._id,
    });
  } catch (error) {
    return res.status(400).json({
      Error: "An error occurred while registering user",
      error,
    });
  }
};

/**============================ Login ==========================**/
export const Login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // check if the user exist
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { _id, email, role } = user;
      const token = jwt.sign({ _id, email, role }, JWT_SECRET as string, {
        expiresIn: "3d",
      });

      //Omit password when sending response
      return res.status(200).json({
        message: "Login successful",
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        role: user.role,
        _id: user._id,
        token,
      });
    } else {
      return res.status(400).json({
        Error: "Invalid username or password",
      });
    }
  } catch (error) {
    return res.status(400).json({
      Error: "An error occured while logging user in",
      error,
    });
  }
};

//**==================== PROFILE =======================**/

export const getSingleUser = async (req: JwtPayload, res: Response) => {
  const id = req.params.id
  try {
    const user = await User.findById(id);
    
    //Omit password when sending response
    if(user) {
      return res.status(200).json({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        role: user.role,
        _id: user._id,
      })
    } else {
      return res.status(400).json({
        message: "User not found",
      });
    }
    
  } catch (error) {
      return res.status(500).json({
        Error: "Internal server Error",
        route: "/get-user",
      });
  }
}


export const updateUserProfile = async (req: JwtPayload, res: Response) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone
    }, {
      new: true,
    });

    if(updatedUser) {
      const user = await User.findById(id)
      return res.status(201).json({
        message: "You have successfully updated your profile",
        user
      });
    } else {
      return res.status(400).json({
        Error: "An error occured",
      });
    }
    
  } catch (error) {
    return res.status(500).json({
      Error: "Internal server Error",
      route: "/update-profile/:id",
    });
  }
}


export const deleteUser = async (req: JwtPayload, res: Response) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id)

    if(deletedUser) {
      return res.status(200).json({
      message: "User has been successfully deleted",
      });
    } else {
        return res.status(400).json({
        Error: "An error occured",
      });
    }
    
  } catch (error) {
    res.status(500).json({
      Error: "Internal Server Error",
      route: "/delete-user/:id",
    })
  }
}

