import express from "express";
import pool from "../config/db.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const user = req.user.users_id;
    console.log("--> GET /api/order REQUEST FROM USER ID:", user, "EMAIL:", req.user.email);

    const query = `
    SELECT o.*,
       COALESCE(
        json_agg(
          json_build_object(
            'id',p.id,
            'name',p.name,
            'image',p.image,
            'price',oi.price,
            'amount',oi.amount
          )
        ) FILTER (WHERE p.id IS NOT NULL),
         '[]'
      ) AS items
    FROM orders o 
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    WHERE o.users_id = $1
   GROUP BY o.id 
   ORDER BY o.created_at DESC
   `;

    const result = await pool.query(query, [user]);
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Server error with fetching orders:",
        error: error.message,
      });
  }
});

router.post("/", protect, async (req, res) => {
  const { shipping_adress, items, total_amount } = req.body;

  if (!shipping_adress || !items || !total_amount) {
    return res.status(400).json({ message: "Provide all the fields" });
  }

  const client = await pool.connect();

  const user = req.user.users_id;

  try {
    await client.query("BEGIN");

    const orderQuery = `
    INSERT INTO orders (users_id, total_amount ,shipping_adress, status)
    VALUES ($1, $2, $3, 'Processing')
    RETURNING id, total_amount, shipping_adress  , status, created_at
    `;
    const orderResult = await client.query(orderQuery, [
      user,
      total_amount,
      shipping_adress,
    ]);

    const newOrder = orderResult.rows[0];

    for (const item of items) {
      const itemQuery = `
      INSERT INTO order_items ( order_id, product_id, price, amount) 
      VALUES ($1,$2, $3, $4) 
      `;

      await client.query(itemQuery, [
        newOrder.id,
        item.id,
        item.price,
        item.amount,
      ]);
    }

    await client.query("DELETE FROM cart WHERE users_id = $1", [user]);

    await client.query("COMMIT");

    return res.status(201).json({
      message: "Order placed succesfully",
      order: { ...newOrder, items },
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error with creating order:", error.message);
    return res
      .status(500)
      .json({ message: "Error on server with creating order" });
  } finally {
    client.release();
  }
});

export default router;
