"use client";
import React from "react";
import TinyBtn from "./ui/TinyBtn";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useMarket } from "../store.js";

const badgeStyles = {
  Sale: "bg-red-500 text-white",
  New: "bg-emerald-500 text-white",
  Premium: "bg-amber-500 text-white",
};

function ProductCard({ product, index }) {
  const addToCart = useMarket((state) => state.addToCart);

  return (
    <div
      className="max-w-92.5 flex flex-col group overflow-hidden relative border  border-gray-200 rounded-2xl animate-fide-up transition-all hover:shadow-2xl duration-300"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Link
        href={`/shop/${product.id}`}
        className="relative h-87.5 overflow-hidden "
      >
        <img
          className="group-hover:scale-105 transition-transform duration-400 "
          src={product.image}
          alt=""
        />
        <div
          className={`absolute top-3 left-3 rounded-full ${badgeStyles[product.badge]} px-3 py-0.5 text-sm font-medium`}
        >
          {product.badge}
        </div>
      </Link>
      <div className="p-4 flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-medium text-gray-500 tracking-wide">
            {product.category.toUpperCase()}
          </h3>
          <div className="flex items-center space-x-1.5 text-xs font-medium">
            <img src="favourites.png" className="w-3.5 h-3.5" alt="" />
            <p>{product.rating}</p>
            <p className="text-gray-500">({product.reviews})</p>
          </div>
        </div>
        <h2 className="line-clamp-1 font-semibold transition-colors group-hover:text-orange-500 duration-300">
          {product.name}
        </h2>
        <div className="flex items-end justify-between pt-3">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold">${product.price}</h1>
            {product.originalPrice && (
              <h3 className="text-sm font-medium text-gray-500 line-through">
                ${product.originalPrice}
              </h3>
            )}
          </div>

          {/* <TinyBtn
            onclick={AddToCart(product)}
            text={<ShoppingBag size={20} />}
            hover={"hover:bg-orange-400"}
            color={"text-white bg-orange-500"}
            rounded={"rounded-xl"}
          /> */}
          <button
            onClick={() => addToCart({ product, amount: 1 })}
            className={`text-sm rounded-xl flex justify-center items-center transition-colors font-medium cursor-pointer hover:bg-orange-400 text-white bg-orange-500 h-10 w-10`}
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
