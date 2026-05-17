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
  addInstallment,
} from "../controller/productController.js";

const route = express.Router();

route.post(
  "/create",
  upload.fields([
    { name: "receiptImage", maxCount: 1 },
    { name: "productImage", maxCount: 1 },
  ]),
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

route.post("/installment/:id", addInstallment);

export default route;