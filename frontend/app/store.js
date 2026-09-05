import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useMarket = create(
  persist(
    (set) => ({
      cart: [],

      setCart: (serverCart) => set({ cart: serverCart }),

      addToCart: async (data) => {
        const product = data.product ? data.product : data;
        const amount = data.amount || 1;

        set((state) => {
          const exist = state.cart.find((item) => item.id == product.id);

          if (exist) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, amount: item.amount + amount }
                  : item,
              ),
            };
          }
          return { cart: [...state.cart, { ...product, amount: amount }] };
        });

        try {
          await axios.post(
            "http://localhost:5000/api/cart",
            {
              productId: product.id,
              amount,
            },
            { withCredentials: true },
          );
        } catch (error) {
          console.error("Failed to save item to sql!", error.message);
        }
      },
      removeProduct: async (productId) => {
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== productId),
        }));

        try {
          await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
            withCredentials: true,
          });
        } catch (error) {
          console.error("Failed to delete item to sql!", error.message);
        }
      },
      changeAmount: async (productId, delta = -1) => {
        set((state) => {
          const existProduct = state.cart.find((item) => Number(item.id) === Number(productId));
          if (!existProduct) return state;

          const nextAmount = existProduct.amount + delta;

          if (nextAmount <= 0) {
            return {
              cart: state.cart.filter((p) => Number(p.id) !== Number(productId)),
            };
          }

          return {
            cart: state.cart.map((i) =>
              i.id === productId ? { ...i, amount: nextAmount } : i,
            ),
          };
        });
        try {
          const action = delta > 0 ? "Increment" : "Decrement";

          await axios.put(
            `http://localhost:5000/api/cart/${productId}`,
            {
              action,
            },
            { withCredentials: true },
          );
        } catch (error) {
          console.error("Failed to update quantity to sql!", error);
        }
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "market-storage",
    },
  ),
);
