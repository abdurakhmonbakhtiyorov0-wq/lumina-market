"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Package, Search, ArrowRight, ShoppingBag, LogIn, UserCheck } from "lucide-react";
import OrderCard from "../components/OrderCard";
import MetricCard from "../components/ui/MetricCard";
import { useAuth } from "../context/AuthRoutes";
import { getOrdersForUser } from "../api/userOrders";

const FILTER_TABS = ["All", "Processing", "Delivered", "Cancelled"];

function OrdersPage() {
  const { user } = useAuth(); // Logged-in user from AuthContext ({ users_id, name, email })
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Retrieves only the orders that belong to the logged-in user!
  const myUserOrders = useMemo(() => {
    if (!user) return [];
    return getOrdersForUser(user);
  }, [user]);

  // Filter based on active tab and search input
  const filteredOrders = useMemo(() => {
    return myUserOrders.filter((order) => {
      const matchesTab =
        activeTab === "All"
          ? true
          : order.status.toLowerCase() === activeTab.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        String(order.id).includes(q) ||
        order.items.some((item) => item.name.toLowerCase().includes(q));

      return matchesTab && matchesSearch;
    });
  }, [myUserOrders, activeTab, searchQuery]);

  const totalSpent = myUserOrders.reduce(
    (acc, o) => acc + (Number(o.total_amount) || 0),
    0
  );
  const activeCount = myUserOrders.filter((o) => o.status === "Processing").length;

  // Case 1: User is not logged in
  if (!user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#FBFBFC]">
        <div className="max-w-md w-full bg-white border border-gray-200/90 rounded-3xl p-8 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-5 shadow-inner">
            <LogIn size={28} />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Sign in to view your orders
          </h2>
          <p className="text-gray-500 text-sm mt-2 mb-6 leading-relaxed">
            Please log in with your Lumina account to view your purchase history.
          </p>
          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md shadow-orange-500/20 transition-all text-sm"
            >
              <LogIn size={16} /> Log in to my account
            </Link>
            <Link
              href="/shop"
              className="w-full block py-2.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
            >
              Continue shopping as guest
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: User is logged in -> Show ONLY their orders
  return (
    <div className="min-h-screen bg-[#FBFBFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full w-fit mb-3 border border-orange-100">
              <UserCheck size={14} /> Orders for {user?.name || user?.email}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              My Orders
            </h1>
            <p className="mt-2 text-gray-500 text-sm sm:text-base">
              Viewing orders placed by <span className="font-semibold text-gray-800">{user?.email}</span>
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <MetricCard label="Your Orders" value={myUserOrders.length} />
            <MetricCard label="Active" value={activeCount} colorClass="text-orange-500" />
            <MetricCard
              label="Total Spent"
              value={`$${totalSpent.toFixed(2)}`}
              className="hidden sm:block"
            />
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="my-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-100/90 rounded-2xl w-full sm:w-auto overflow-x-auto">
            {FILTER_TABS.map((tab) => {
              const isActive = activeTab === tab;
              const count =
                tab === "All"
                  ? myUserOrders.length
                  : myUserOrders.filter((o) => o.status.toLowerCase() === tab.toLowerCase()).length;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {tab}
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID or item name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-lg mx-auto shadow-sm my-12">
            <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No orders found</h3>
            <p className="text-gray-500 text-sm mt-1 mb-6">
              {searchQuery
                ? `No orders matching "${searchQuery}".`
                : activeTab === "All"
                ? "You haven't placed any orders yet."
                : `You don't have any ${activeTab.toLowerCase()} orders.`}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md shadow-orange-500/20 transition-colors"
            >
              Start Shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default OrdersPage;
