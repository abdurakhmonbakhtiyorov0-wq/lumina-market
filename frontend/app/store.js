import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useMarket = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (data) =>
        set((state) => {
          const newItem = data.product ? data.product : data;
          const newAmount = data.amount || 1;

          const exist = state.cart.find((item) => item.id == newItem.id);

          if (exist) {
            return {
              cart: state.cart.map((item) =>
                item.id === newItem.id
                  ? { ...item, amount: item.amount + newAmount }
                  : item,
              ),
            };
          }
          return { cart: [...state.cart, { ...newItem, amount: newAmount }] };
        }),
      removeProduct: (id) =>
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== id),
        })),
      changeAmount: (id) =>
        set((state) => {
          const existProduct = state.cart.find((item) => item.id === id);
          if (!existProduct) return state;

          if (existProduct.amount <= 1) {
            return {
              cart: state.cart.filter((p) => p.id !== id),
            };
          }
          return {
            cart: state.cart.map((i) =>
              i.id === id ? { ...i, amount: i.amount - 1 } : i,
            ),
          };
        }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "market-storage",
    },
  ),
);
