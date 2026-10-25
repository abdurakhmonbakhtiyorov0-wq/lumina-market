"use client";

import axios from "axios";
import { useContext, createContext, use } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axios.get("/api/auth/me", {
        withCredentials: true,
      });
      return res.data
    },
    retry: false,
  });

  const setUser = (userData) => {
    queryClient.setQueryData(["authUser"], userData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full items-center justify-center flex gap-2.5">
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
