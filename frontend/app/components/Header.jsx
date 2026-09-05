"use client";

import { DoorClosed, LogOut, PackageCheck, Plus, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import TinyBtn from "./ui/TinyBtn";
import Button from "./ui/Button";
import { useMarket } from "../store";
import { useAuth } from "../context/AuthRoutes";
import axios from "axios";

const Links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/shop",
    label: "Shop",
  },
  {
    href: "/sell",
    label: "Sell",
  },
];

function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const cart = useMarket((state) => state.cart);
  const clearCart = useMarket((state) => state.clearCart);

  const productsAmount = cart?.reduce((acc, item) => acc + item.amount, 0);
  const letter = user?.name?.slice(0, 1).toUpperCase();

  const handleLogOut = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true },
      );
      setUser(null);
      setIsOpen(false);
      router.push("/");
      router.refresh();
      clearCart();
      localStorage.removeItem("market-storage");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <header className="glass sticky top-0 z-50 border-b bg-transparent shadow-sm w-full transition-all duration-300 border-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={"/"} className="flex items-center gap-2">
          <div className="rounded-xl bg-orange-500 text-white flex items-center justify-center h-9 w-9 shadow-lg shadow-orange-500/30 transition-transform hover:scale-105">
            <ShoppingBag size={20} />
          </div>
          <span className="text-xl tracking-tight font-bold">Lumina</span>
        </Link>
        <nav>
          <ul className="flex items-center gap-1">
            {Links.map((link) => (
              <Link
                className={`relative text-sm py-2 px-4 transition-colors hover:text-orange-500 font-medium ${pathname === link.href ? "text-orange-500 " : "text-gray-900/70"}`}
                key={link.href}
                href={link.href}
              >
                {link.label}
                {pathname === link.href ? (
                  <span className="absolute inset-x-3 rounded-full -bottom-px h-0.5 bg-orange-500"></span>
                ) : (
                  ""
                )}
              </Link>
            ))}
          </ul>
        </nav>
        <div className="flex gap-2 items-center">
          <Link href={"/shop"}>
            <TinyBtn
              hover={"hover:bg-orange-50"}
              color={"hover:text-orange-700"}
              text={<Search size={20} />}
            />
          </Link>
          <Link className="relative" href={"/cart"}>
            {cart.length >= 1 && (
              <div className="bg-orange-500 text-white px-1 -top-1 -right-1 text-xs font-bold h-5 min-w-5 flex justify-center items-center  rounded-full absolute">
                <p>{productsAmount}</p>
              </div>
            )}
            <TinyBtn
              text={<ShoppingBag size={20} />}
              hover={"hover:bg-orange-50"}
              color={"hover:text-orange-700"}
            />
          </Link>
          {!user ? (
            <div className="flex gap-2">
              {" "}
              <Link href={"/login"}>
                <Button
                  hover={"hover:bg-orange-50"}
                  hoverClr={"hover:text-orange-700"}
                  text={"Log in"}
                />
              </Link>
              <Link href={"/register"}>
                <Button
                  color={"text-white"}
                  bg={"bg-orange-500"}
                  hover={"hover:bg-orange-400"}
                  text={"Sign up"}
                />
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full hover:bg-orange-50 text-orange-500 text-sm transition-colors duration-200 cursor-pointer h-10 w-10 flex items-center justify-center"
              >
                <div className="flex items-center justify-center font-bold! h-8 w-8 rounded-full bg-orange-500/10">
                  {letter}
                </div>
              </button>
              {isOpen && (
                <div
                  className={`absolute border border-gray-200 rounded-xl w-56 bg-white top-11 right-1 ${isOpen ? "opacity-100" : "opacity-0"}`}
                >
                  <div className="p-1">
                    <div className="px-2 py-1.75">
                      <p className="font-medium text-sm truncate">
                        {user?.name}
                      </p>
                      <p className="text-sm text-gray-400 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <hr className="w-full bg-gray-200  border-none h-px left-0 my-1" />
                  <div className="px-1">
                    <Link
                      href={"/sell"}
                      className="flex items-center cursor-pointer px-2 py-1.5 w-full gap-2 rounded-lg hover:bg-orange-50 hover:text-orange-500 transition-colors"
                    >
                      <Plus size={16} />
                      <p className="text-sm">Sell a product</p>
                    </Link>
                    <Link
                      href={"/orders"}
                      className="flex items-center cursor-pointer px-2 py-1.5 w-full gap-2 rounded-lg hover:bg-orange-50 hover:text-orange-500 transition-colors"
                    >
                      <PackageCheck size={16} />
                      <p className="text-sm">My orders</p>
                    </Link>
                    <Link
                      href={"/cart"}
                      className="flex items-center cursor-pointer px-2 py-1.5 w-full gap-2 rounded-lg hover:bg-orange-50 hover:text-orange-500 transition-colors"
                    >
                      <ShoppingBag size={16} />
                      <p className="text-sm">My Cart</p>
                    </Link>
                  </div>
                  <hr className="w-full bg-gray-200  border-none h-px left-0 my-1" />
                  <div className="px-1 pb-1">
                    <button
                      onClick={handleLogOut}
                      className="flex items-center cursor-pointer px-2 py-1.5 w-full gap-2 rounded-lg hover:bg-orange-50 text-red-500 transition-colors"
                    >
                      <LogOut size={16} />
                      <p className="text-sm">Sign Out</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
