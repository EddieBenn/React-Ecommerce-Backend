import Product from "../models/productModel";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

/** ================ Get Single Product ================= **/

export const getSingleProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const product = await Product.findById(id);
  
      if(!product) {
        return res.status(400).json({
          message: "Product not found"
        });
      }
      return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({
        Error: "Internal Server Error",
        route: "/get-product/:id",
      })
    }
  }

/** ================ Get All Products ================= **/

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        let products;

        //Enabling limit on req.query
        const queryNew = req.query.new
        const queryCategory = req.query.category

        //Sorting in ascending order
        if(queryNew){
            products = await Product.find().sort({createdAt: -1}).limit(1)
        }

        //meaning if the category in the query params is contained in the category
        else if(queryCategory){
            products = await Product.find({
                categories:{
                    $in: [queryCategory],
                }
            });

        //a fall back to find all products
        }else{
            products = await Product.find()
        }

        return res.status(200).json({
            message: "Successfully fetched all products",
            products,
        });
    } catch (error) {
      return res.status(500).json({
        Error: "Internal Server Error",
        route: "/get-all-products",
      })
    }
  }

/** ================ Add Product ================= **/

export const createProduct = async (req: JwtPayload, res: Response) => {
    try {
      const id = req.user.id
      const { title, description, categories, size, color, prize, image } = req.body
  
      // Check if the product name exist
      const productExist = await Product.findOne({ title });
      if(productExist) {
          return res.status(400).json({
          message: "Product name already exist"
        })
      }
      
      const newproduct = await Product.create({
        title,
        description,
        categories,
        size,
        color,
        prize,
        adminId: id,
        image: req.file.path
      });
  
      newproduct.save();
  
      if(newproduct) {
        return res.status(201).json({
          message: "Product successfully added",
          newproduct
        })
      } else {
        return res.status(400).json({
          message: "An error occured"
        })
      }
  
    } catch (error) {
        return res.status(500).json({
        Error: "Internal Server Error",
        route: "/create-product",
    });
    }
}

/** ================ Update Product ================= **/

export const updateProduct = async (req: JwtPayload, res: Response) => {
    const id = req.params.id;
    try {
      const product = await Product.findById(id)
      if(!product) {
        return res.status(400).json({
          message: "Product not found"
        });
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(id, {
        title: req.body.title || product.title,
        description: req.body.description || product.description,
        categories: req.body.categories || product.categories,
        size: req.body.size || product.size,
        color: req.body.color || product.color,
        prize: req.body.prize || product.prize,
        image: req.file.path || product.image,
      }, {
        new: true,
      });
  
      updatedProduct?.save();
  
      if(updatedProduct) {
        return res.status(201).json({
          message: "Product update successful",
          updatedProduct
        })
      } else {
        return res.status(400).json({
          message: "An error occured"
        })
      }
      
    } catch (error) {
        return res.status(500).json({
        Error: "Internal Server Error",
        route: "/update-product/:id",
      });
    }
}

/** ================ Delete Product ================= **/

export const deleteProduct = async (req: JwtPayload, res: Response) => {
    try {
      const id = req.params.id;
      const product = await Product.findById(id)
  
      if(!product) {
        return res.status(400).json({
          message: "Product not found"
        });
      }
  
      const deletedProduct = await Product.findByIdAndDelete(id);
      return res.status(200).json({
        message: "Product successfully deleted",
        deletedProduct
      })
    } catch (error) {
        return res.status(500).json({
        Error: "Internal Server Error",
        route: "/delete-product/:id",
      });
    }
}
  
  
