-- Database structure for Lumina Market.
-- Run once in a new database (Neon / Supabase SQL editor) before starting the backend.

CREATE TABLE IF NOT EXISTS users (
  users_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  image VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  price NUMERIC NOT NULL DEFAULT 10.00,
  stock INTEGER NOT NULL DEFAULT 1,
  category VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  created_by VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS cart (
  users_id INTEGER NOT NULL REFERENCES users(users_id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL DEFAULT 1 CHECK (amount > 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (users_id, product_id)
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  users_id INTEGER REFERENCES users(users_id) ON DELETE CASCADE,
  total_amount NUMERIC NOT NULL,
  shipping_adress TEXT NOT NULL,
  status VARCHAR DEFAULT 'Processing',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  price NUMERIC NOT NULL,
  amount INTEGER NOT NULL
);
