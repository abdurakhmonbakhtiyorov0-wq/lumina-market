router.get("/", protect, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         p.*, c.amount
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.users_id = $1`,
      [req.user.users_id],
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: "Server error with fetching cart" });
  }
});

router.post("/", protect, async (req, res) => {
  const { product_id, amount } = req.body;
  const amountToAdd = amount || 1;

  try {
    const product = await pool.query(
      "SELECT stock FROM products WHERE id = $1",
      [product_id],
    );

    if (product.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const avilableStock = product.rows[0].stock;

    const result = await pool.query(
      "INSERT INTO cart (users_id, product_id, amount) VALUES ($1, $2, $3) ON CONFLICT (users_id, product_id) DO UPDATE SET amount = LEAST(cart.amount + EXCLUDED.amount, $4) RETURNING *",
      [req.user.users_id, product_id, amountToAdd, avilableStock],
    );

    return res
      .status(201)
      .json({ message: "Product added to cart", item: result.rows[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error with creating product to cart" });
  }
});

router.put("/:productId", protect, async (req, res) => {
  const { productId } = req.params;
  const { action, value } = req.body;

  const changeValue = parseInt(value) || 1;

  if (changeValue < 1 || changeValue > 7) {
    return res
      .status(400)
      .json({ message: "You may increment or decrement from 1 to 7" });
  }

  try {
    const cartItem = await pool.query(
      "SELECT c.amount, p.stock FROM cart c JOIN products p ON c.product_id = p.id WHERE c.users_id = $1 AND c.product_id = $2",
      [req.user.users_id, productId],
    );

    if (cartItem?.rows?.length === 0) {
      return res.status(404).json({ message: "Product is not in your cart" });
    }

    const currentAmount = cartItem.rows[0].amount;
    const maxStock = cartItem.rows[0].stock;

    if (action === "Increment") {
      if (currentAmount + changeValue > maxStock) {
        return res.status(400).json({
          message: `Not enough stock. Only ${maxStock - currentAmount} more items cant be added.`,
        });
      }

      const result = await pool.query(
        "UPDATE cart SET amount = amount + $1 WHERE users_id = $2 AND product_id = $3 RETURNING *",
        [changeValue, req.user.users_id, productId],
      );

      return res.status(200).json({
        message: `Quantity increased by ${changeValue}`,
        item: result.rows[0],
      });
    } else if (action === "Decrement") {
      if (currentAmount - changeValue <= 0) {
        await pool.query(
          "DELETE FROM cart WHERE product_id = $1 AND users_id = $2",
          [productId, req.user.users_id],
        );
        return res
          .status(200)
          .json({ message: "Product was deleted from cart" });
      }

      const result = await pool.query(
        `UPDATE cart SET amount = amount - $1 WHERE users_id = $2 AND product_id = $3 RETURNING *`,
        [changeValue, req.user.users_id, productId],
      );

      return res.status(200).json({
        message: `Quantity decreased by ${changeValue}`,
        item: result.rows[0],
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid action use Increment or Decrement" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error with change amount in your cart" });
  }
});

router.delete("/:productId", protect, async (req, res) => {
  const { productId } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM cart WHERE users_id = $1 AND product_id = $2 RETURNING *"[
        (req.user.users_id, productId)  
      ],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product is not in your cart" });
    }

    return res.status(200).json({ message: "Product deleted from your cart" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error with delete product in your cart" });
  }
});
