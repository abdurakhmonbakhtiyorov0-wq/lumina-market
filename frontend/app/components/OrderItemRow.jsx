"use client";

import React from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { useMarket } from "../store";

function OrderItemRow({ item }) {
 const addToCart = useMarket((state) => state.addToCart)

 const handleBuyAgain = () => {
  addToCart(item)
 }
  return (
    <div className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 rounded-2xl object-cover border border-gray-200/80 shrink-0 bg-gray-50"
        />
        <div>
          <Link
            href={`/shop/${item.id}`}
            className="font-bold text-base text-gray-900 hover:text-orange-500 transition-colors"
          >
            {item.name}
          </Link>
          <div className="mt-1 flex items-center gap-3">
            <span className="text-xs font-bold text-gray-900">
              ${Number(item.price).toFixed(2)}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              Qty: {item.amount}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:self-center">
        <button
          onClick={handleBuyAgain}
          className="text-xs font-semibold px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition-colors shadow-xs shadow-orange-500/20 flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw size={13} /> Buy Again
        </button>
      </div>
    </div>
  );
}

export default OrderItemRow;
