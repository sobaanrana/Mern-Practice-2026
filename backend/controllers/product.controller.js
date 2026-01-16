import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products.length) {
      return res
        .status(404)
        .json({ success: false, message: "No Products Found" });
    }
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .send({ success: false, message: "All fields are required" });
  }

  const newProduct = new Product(product);
  //const created = await Product.create(product); // or await new Product(product).save()
  try {
    await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: "Product Created Successfully" });
  } catch (error) {
    console.log("Error creating Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, message: "Product Not Found" });
    }
  } catch (error) {
    console.log("Error fetching Product by ID:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("Error updating Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// this updates as well
// const product = await Product.findById(req.params.id);
// if (product) {
//   product.name = req.body.name || product.name;
//   product.price = req.body.price || product.price;
//   product.image = req.body.image || product.image;

//   const updatedProduct = await product.save();
//   res.status(200).json({ success: true, data: updatedProduct });
// } else {
//   res.status(404).json({ success: false, message: "Product Not Found" });
// }

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    console.log("Error Deleting paramsroduct:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
