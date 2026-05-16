import express from "express";
import upload from "../middleware/upload.js";

import {
  createProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getInstallmentProducts,
  getExpiredProducts,
} from "../controller/productController.js";

const route = express.Router();

route.post(
  "/create",
  upload.single("receiptImage"),
  createProduct
);

route.get("/getallproducts", fetchProducts);

route.put("/update/:id", updateProduct);

route.delete("/delete/:id", deleteProduct);

route.get(
  "/category/:category",
  getProductsByCategory
);

route.get(
  "/installments",
  getInstallmentProducts
);

route.get(
  "/expired",
  getExpiredProducts
);

export default route;