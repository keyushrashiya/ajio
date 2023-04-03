import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { join } from "path";
import userRoute from "./router/userRoute.js";
import productRoute from "./router/productRoute.js";
import orderRoute from "./router/orderRoute.js";
import addressRoute from "./router/addressRoute.js";
import { connectDb } from "./helper/connectDb.js";
import bodyParser from "body-parser";
import validateToken from "./validator/tokenValidate.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// Connect DB
connectDb(DATABASE_URL);

// JSON parser
app.use(bodyParser.json({ limit: "50mb" }));

// CORS 
app.use(cors())

// Static Path
app.use("/public", express.static(join(process.cwd(), "upload")));

// Auth Route
app.use("/api/v1/auth", userRoute);
// Product Route
app.use("/api/v1/product", validateToken, productRoute);
// Order Route
app.use("/api/v1/order", validateToken, orderRoute);
// Address Route
app.use("/api/v1/address", validateToken, addressRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
