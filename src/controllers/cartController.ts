import { Request, Response } from 'express';
import Cart from '../models/cartModel';


export const createCart = async (req: Request, res: Response) => {
    try {
        const { products } = req.body
        const newCart = await Cart.create({
            products
            });
        
        newCart.save();
        return res.status(200).json({
            message: "Product added to cart",
            newCart
            });
    } catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/add-to-cart"
          });
    }
}

export const updateCart = async(req: Request, res: Response) => {
    try {
        const { id } = req.params
        const updatedCart = await Cart.findByIdAndUpdate(id, {
            $set: req.body
        }, {new: true})

        return res.status(200).json({
            message: "Successfully updated cart details",
            updatedCart
        })
    } catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/update-cart/:id",
          });
    }
}

/**================= Delete a cart item =================**/

export const deleteCart = async (req: Request, res: Response)=>{
    try{
        const { id } = req.params
        const deletedCart = await Cart.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Cart item successfully deleted",
            deletedCart
        }) 
    } catch(error){
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/delete-cart/:id",
          });
    }
}

/**================= Get user cart =================**/

export const getCartByUserId = async (req: Request, res: Response)=>{
    try{
        const { userId } = req.params
        const getUserCart = await Cart.findOne({ userId })
        return res.status(200).json({
            message: "Successfully fetched user cart",
            getUserCart
        })
    } catch(error){
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/get-user-cart/:userId",
          });
    }
}

/**================= Get all cart items =================**/

export const getAllCartItems = async (req: Request, res: Response) => {
    try{
        const getCartItems = await Cart.find()
        return res.status(200).json({
            message: "Successfully fetched all cart items",
            getCartItems,
        })
    } catch(error){
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/get-all-cart-items"
          });
    }
}
