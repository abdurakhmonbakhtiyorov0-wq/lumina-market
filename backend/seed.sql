-- Starter products for Lumina Market (same as frontend/app/api/products.js).
-- Run after schema.sql. Safe to run again: products that already exist by name are skipped.

INSERT INTO products (name, image, price, stock, category, description, created_by)
SELECT v.name, v.image, v.price, v.stock, v.category, v.description, v.created_by
FROM (VALUES
  ('Aero Runner Sneakers',
   'https://images.pexels.com/photos/19869759/pexels-photo-19869759.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   129, 18, 'Sneakers',
   'Lightweight performance sneakers engineered for all-day comfort. Breathable knit upper with responsive cushioning.',
   'Urban Steps'),
  ('Onyx Chronograph Watch',
   'https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   349, 7, 'Watches',
   'A precision chronograph with sapphire crystal and a genuine leather strap. Water-resistant to 100m.',
   'Meridian Co.'),
  ('Studio Wireless Headphones',
   'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   199, 32, 'Audio',
   'Immersive over-ear headphones with active noise cancellation, 40-hour battery, and plush memory-foam cushions.',
   'Soundwave'),
  ('Heritage Leather Tote',
   'https://images.pexels.com/photos/27204287/pexels-photo-27204287.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   289, 11, 'Bags',
   'Full-grain leather tote with a structured silhouette, gold-tone hardware, and a suede-lined interior.',
   'Maison Luxe'),
  ('Eclipse Aviator Sunglasses',
   'https://images.pexels.com/photos/32677231/pexels-photo-32677231.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   159, 24, 'Eyewear',
   'Polarized aviator sunglasses with a lightweight titanium frame and 100% UV protection lenses.',
   'Vista Eyewear'),
  ('Noir Eau de Parfum',
   'https://images.pexels.com/photos/6958875/pexels-photo-6958875.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   119, 40, 'Fragrance',
   'A warm, woody fragrance with notes of bergamot, cedar, and amber. Long-lasting eau de parfum, 100ml.',
   'Atelier Scent'),
  ('Rangefinder Camera X3',
   'https://images.pexels.com/photos/16671406/pexels-photo-16671406.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   899, 5, 'Cameras',
   'A compact rangefinder camera with a 24MP sensor, 4K video, and a classic retro design. Includes prime lens.',
   'Optika Labs'),
  ('Court Classic Low Sneakers',
   'https://images.pexels.com/photos/27204251/pexels-photo-27204251.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   99, 50, 'Sneakers',
   'Minimalist court sneakers in soft white leather. A versatile wardrobe staple with a cushioned insole.',
   'Urban Steps')
) AS v(name, image, price, stock, category, description, created_by)
WHERE NOT EXISTS (SELECT 1 FROM products p WHERE p.name = v.name);
