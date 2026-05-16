import Product from "../model/productModel.js";


// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {

    const productData = new Product(req.body);

    const savedProduct = await productData.save();

    res.status(200).json({
      message: "Product added successfully.",
      product: savedProduct,
    });

  } catch (error) {

    res.status(500).json({
      error: "Internal Server Error.",
    });

  }
};


// FETCH ALL PRODUCTS
export const fetchProducts = async (req, res) => {
  try {

    const products = await Product.find();

    if (products.length === 0) {
      return res.status(404).json({
        message: "No products found.",
      });
    }

    const updatedProducts = products.map((product) => {

      const purchaseDate = new Date(product.purchaseDate);

      const expiryDate = new Date(purchaseDate);

      expiryDate.setMonth(
        expiryDate.getMonth() + product.warrantyMonths
      );

      const today = new Date();

      const warrantyStatus =
        expiryDate >= today ? "Active" : "Expired";

      return {
        ...product._doc,

        warrantyExpiryDate: expiryDate,

        warrantyStatus: warrantyStatus,
      };
    });

    res.status(200).json(updatedProducts);

  } catch (error) {

    res.status(500).json({
      error: "Internal Server Error.",
    });

  }
};


// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {

    const id = req.params.id;

    const productExist = await Product.findOne({ _id: id });

    if (!productExist) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });

  } catch (error) {

    res.status(500).json({
      error: "Internal Server Error.",
    });

  }
};


// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {

    const id = req.params.id;

    const productExist = await Product.findOne({ _id: id });

    if (!productExist) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product deleted successfully.",
    });

  } catch (error) {

    res.status(500).json({
      error: "Internal Server Error.",
    });

  }
};