// Frontend mock data strictly matching your PostgreSQL database schema & checkout inputs
// No backend required for testing!

export const userOrders = [
  {
    id: 1, // PostgreSQL SERIAL integer
    users_id: 1, // Foreign key to users(users_id)
    total_amount: 2593.0, // Calculated total price
    shipping_address: "Ali, 123 Main Street, San Francisco, 94101, USA", // From checkout formData
    status: "Processing", // orders.status column
    created_at: "2026-08-30T18:00:00.000Z", // orders.created_at timestamp
    items: [
      {
        id: 1, // products.id
        name: "iPhone 15 Pro", // products.name
        price: 2464.0, // products.price
        amount: 1, // order_items.amount (qty)
        image:
          "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      },
      {
        id: 2,
        name: "Aero Runner Sneakers",
        price: 129.0,
        amount: 1,
        image:
          "https://images.pexels.com/photos/19869759/pexels-photo-19869759.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      },
    ],
  },
  {
    id: 2,
    users_id: 1,
    total_amount: 349.0,
    shipping_address: "Ali, 123 Main Street, San Francisco, 94101, USA",
    status: "Delivered",
    created_at: "2026-08-20T14:30:00.000Z",
    items: [
      {
        id: 3,
        name: "Onyx Chronograph Watch",
        price: 349.0,
        amount: 1,
        image:
          "https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      },
    ],
  },
  {
    id: 3,
    users_id: 1,
    total_amount: 199.0,
    shipping_address: "Ali, 123 Main Street, San Francisco, 94101, USA",
    status: "Delivered",
    created_at: "2026-08-10T11:15:00.000Z",
    items: [
      {
        id: 4,
        name: "Studio Wireless Headphones",
        price: 199.0,
        amount: 1,
        image:
          "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      },
    ],
  },
];

/**
 * Returns orders strictly for the logged-in user.
 * Automatically customizes the orders for whichever account is currently logged in!
 */
export function getOrdersForUser(currentUser) {
  if (!currentUser) return [];

  return userOrders.map((order) => ({
    ...order,
    users_id: currentUser.users_id || 1,
    shipping_address: `${currentUser.name || "Customer"}, 123 Main Street, San Francisco, 94101, USA`,
  }));
x}
