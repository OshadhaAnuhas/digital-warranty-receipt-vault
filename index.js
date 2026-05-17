import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import route from "./routes/productRoute.js";

dotenv.config();

// ✅ 1. Initialize app FIRST
const app = express();

// ✅ 2. Middleware AFTER app is created
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// ✅ 3. Routes
app.use("/api/product", route);

// ✅ 4. Basic test route
app.get("/", (req, res) => {
  res.send("Warranty Vault API is running.");
});

// ✅ 5. Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// ✅ 6. Database connection + server start
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));