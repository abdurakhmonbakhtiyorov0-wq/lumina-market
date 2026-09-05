import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import sellRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/sell", sellRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (_, res) => {
  console.log(`Server is running on port ${PORT}`);
});
