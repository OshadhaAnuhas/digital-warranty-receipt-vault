import Product from "../model/productModel.js";


// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    console.log(req.body);
   const productData = new Product({
  ...req.body,
  receiptImage: req.files?.receiptImage?.[0]?.filename || "",
  productImage: req.files?.productImage?.[0]?.filename || "",
});

    const savedProduct = await productData.save();

    res.status(200).json({
      message: "Product added successfully.",
      product: savedProduct,
    });

  } catch (error) {

  console.log(error);

  res.status(500).json({
    error: error.message,
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

      let remainingInstallments = 0;

let remainingBalance = 0;

let installmentStatus = "Not Applicable";

if (product.isInstallment) {

  remainingInstallments =
    product.totalInstallments -
    product.completedInstallments;

  remainingBalance =
    remainingInstallments * product.monthlyAmount;

  installmentStatus =
    remainingInstallments > 0
      ? "Ongoing"
      : "Completed";
}

      return {
       ...product._doc,

     warrantyExpiryDate: expiryDate,

     warrantyStatus: warrantyStatus,

     remainingInstallments: remainingInstallments,

     remainingBalance: remainingBalance,

     installmentStatus: installmentStatus,

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

    const updated = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(updated);

  } catch (error) {
    res.status(500).json({
      error: error.message,
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

export const getProductsByCategory = async (req, res) => {

  try {

    const category = req.params.category;

    const products = await Product.find({
      category: category,
    });

    if (products.length === 0) {
      return res.status(404).json({
        message: "No products found in this category.",
      });
    }

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({
      error: "Internal Server Error.",
    });

  }
};

export const getInstallmentProducts = async (req, res) => {

  try {

    const products = await Product.find({
      isInstallment: true,
    });

    if (products.length === 0) {
      return res.status(404).json({
        message: "No installment products found.",
      });
    }

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({
      error: "Internal Server Error.",
    });

  }
};

export const getExpiredProducts = async (req, res) => {

  try {

    const products = await Product.find();

    const expiredProducts = products.filter((product) => {

      const purchaseDate = new Date(product.purchaseDate);

      const expiryDate = new Date(purchaseDate);

      expiryDate.setMonth(
        expiryDate.getMonth() + product.warrantyMonths
      );

      return expiryDate < new Date();
    });

    if (expiredProducts.length === 0) {
      return res.status(404).json({
        message: "No expired products found.",
      });
    }

    res.status(200).json(expiredProducts);

  } catch (error) {

    res.status(500).json({
      error: "Internal Server Error.",
    });

  }
};

export const addInstallment = async (req, res) => {
  try {
    const id = req.params.id;

    const { amountPaid, note } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.installmentHistory.push({
      amountPaid,
      note,
    });

    product.completedInstallments =
      product.installmentHistory.length;

    await product.save();

    res.status(200).json({
      message: "Installment added successfully",
      product,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};