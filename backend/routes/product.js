import express from "express";
import pool from "../config/db.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const products = await pool.query("SELECT * FROM products");

    res.status(200).json({ item: products.rows });
  } catch (error) {
    res.status(500).json({ message: "Server error fetching products" });
  }
});

router.get("/:id", protect, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await pool.query("SELECT FROM products WHERE id = $1", [
      id,
    ]);

    return res.status(200).json({ item: product.rows });
  } catch (error) {}
  res.status(500).json({ message: "Server error fetching product" });
});

router.post("/products", async (req, res) => {
  const { name, image, price, stock, category, description, created_by } =
    req.body;

  try {
    if (!name || !image || !price || !stock || !category || !description) {
      res.status(400).json({ message: "Provide all the required fieldsdee" });
    }

    const exist = await pool.query("SELECT * FROM products WHERE name = $1", [
      name,
    ]);

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Products already exist" });
    }

    const newProduct = await pool.query(
      "INSERT INTO products (name, image, price, stock, category, description, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name, image, price, stock, description, created_by",
      [name, image, price, stock, category, description, created_by],
    );

    res.status(201).json({
      message: "Product was created successfully",
      item: newProduct.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
});

export default router;
