"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import { useMarket } from "../store";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axios.get("/api/sell", {
        withCredentials: true,
      });
      const result = res.data.item;
      return result;
    },
    retry: 3,
  });

  const setProduct = (productData) => {
    queryClient.setQueryData(["product"], productData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full items-center justify-center flex gap-2.5">
        Loading...
      </div>
    );
  }

  return (
    <ProductContext.Provider value={{ products, setProduct, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useSyncCart() {
  const setCart = useMarket((state) => state.cart);

  const { data: serverCart } = useQuery({
    queryKey: ["serverCart"],
    queryFn: async () => {
      const res = await axios.get("/api/cart/", {
        withCredentials: true,
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if(serverCart){
      setCart(serverCart)
    }
  },[serverCart, setCart])
}

export function useProduct() {
  return useContext(ProductContext);
}
