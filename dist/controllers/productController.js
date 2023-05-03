"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getAllProducts = exports.getSingleProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
/** ================ Get Single Product ================= **/
const getSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productModel_1.default.findById(id);
        if (!product) {
            return res.status(400).json({
                message: "Product not found"
            });
        }
        return res.status(200).json(product);
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/get-product/:id",
        });
    }
};
exports.getSingleProduct = getSingleProduct;
/** ================ Get All Products ================= **/
const getAllProducts = async (req, res) => {
    try {
        let products;
        //Enabling limit on req.query
        const queryNew = req.query.new;
        const queryCategory = req.query.category;
        //Sorting in ascending order
        if (queryNew) {
            products = await productModel_1.default.find().sort({ createdAt: -1 }).limit(1);
        }
        //meaning if the category in the query params is contained in the category
        else if (queryCategory) {
            products = await productModel_1.default.find({
                categories: {
                    $in: [queryCategory],
                }
            });
            //a fall back to find all products
        }
        else {
            products = await productModel_1.default.find();
        }
        return res.status(200).json({
            message: "Successfully fetched all products",
            products,
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/get-all-products",
        });
    }
};
exports.getAllProducts = getAllProducts;
/** ================ Add Product ================= **/
const createProduct = async (req, res) => {
    try {
        const id = req.user.id;
        const { title, description, categories, size, color, prize, image } = req.body;
        // Check if the product name exist
        const productExist = await productModel_1.default.findOne({ title });
        if (productExist) {
            return res.status(400).json({
                message: "Product name already exist"
            });
        }
        const newproduct = await productModel_1.default.create({
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
        if (newproduct) {
            return res.status(201).json({
                message: "Product successfully added",
                newproduct
            });
        }
        else {
            return res.status(400).json({
                message: "An error occured"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/create-product",
        });
    }
};
exports.createProduct = createProduct;
/** ================ Update Product ================= **/
const updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await productModel_1.default.findById(id);
        if (!product) {
            return res.status(400).json({
                message: "Product not found"
            });
        }
        const updatedProduct = await productModel_1.default.findByIdAndUpdate(id, {
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
        if (updatedProduct) {
            return res.status(201).json({
                message: "Product update successful",
                updatedProduct
            });
        }
        else {
            return res.status(400).json({
                message: "An error occured"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/update-product/:id",
        });
    }
};
exports.updateProduct = updateProduct;
/** ================ Delete Product ================= **/
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productModel_1.default.findById(id);
        if (!product) {
            return res.status(400).json({
                message: "Product not found"
            });
        }
        const deletedProduct = await productModel_1.default.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Product successfully deleted",
            deletedProduct
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "/delete-product/:id",
        });
    }
};
exports.deleteProduct = deleteProduct;
