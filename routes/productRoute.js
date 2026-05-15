import express from "express";

import {
  createProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const route = express.Router();

route.post("/create", createProduct);

route.get("/getallproducts", fetchProducts);

route.put("/update/:id", updateProduct);

route.delete("/delete/:id", deleteProduct);

export default route;