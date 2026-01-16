import express from "express";
import dotenv from "dotenv";

import productRoutes from "./routes/product.route.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
