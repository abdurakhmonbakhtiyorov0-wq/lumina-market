"use client";

import React from "react";
import { MapPin, Package } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderItemRow from "./OrderItemRow";

function OrderMetaItem({ label, value, isHighlight = false }) {
  return (
    <div>
      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
        {label}
      </span>
      <span
        className={`font-semibold text-sm sm:text-base ${
          isHighlight ? "text-gray-900 font-bold" : "text-gray-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function OrderCard({ order }) {
  // Format the real PostgreSQL created_at timestamp
  const formattedDate = order.created_at
    ? new Date(order.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Recent";

  const totalItemsCount = order.items?.reduce(
    (acc, item) => acc + (item.amount || 1),
    0
  );

  return (
    <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden animate-fide-up">
      
      {/* 1. Header: strictly from orders table (created_at, id, total_amount, status) */}
      <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <OrderMetaItem label="Order Placed" value={formattedDate} />
          <OrderMetaItem label="Order ID" value={`#${order.id}`} />
          <OrderMetaItem
            label="Total Amount"
            value={`$${Number(order.total_amount).toFixed(2)}`}
            isHighlight
          />
        </div>

        {/* Status Badge + Items count */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-500 bg-gray-200/60 px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <Package size={13} /> {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"}
          </span>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      {/* 2. Items: strictly from products table (image, name, price, amount) */}
      <div className="p-6 divide-y divide-gray-100">
        {order.items?.map((item) => (
          <OrderItemRow key={item.id} item={item} />
        ))}
      </div>

      {/* 3. Footer: strictly from orders.shipping_address */}
      <div className="px-6 py-3.5 bg-gray-50/40 border-t border-gray-100 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-gray-500">
          <MapPin size={15} className="text-orange-500 shrink-0" />
          <span className="truncate">
            Shipping to:{" "}
            <strong className="text-gray-700 font-semibold">
              {order.shipping_address || order.shipping_adress}
            </strong>
          </span>
        </div>
      </div>

    </div>
  );
}

export default OrderCard;
