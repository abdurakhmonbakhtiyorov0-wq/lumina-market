import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { categories } from "./api/products.js";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import { products } from "./api/products.js";
import ProductCard from "./components/ProductCard";

function page() {
  return (
    <div>
      <Hero />
      <section>
        <div className="max-w-7xl">
          <div className="flex space-x-5 items-center justify-center py-6 border-b border-gray-300 px-4 sm:px-6 lg:px-8">
            {categories.map((category) => (
              <Link
                href={`/shop?category=${category}`}
                className="rounded-full px-4 py-2 text-sm border border-gray-200 font-medium transition-colors duration-200 hover:bg-orange-500/5 hover:border-orange-500 hover:text-orange-500"
                key={category}
              >
                {category}
              </Link>
            ))}
          </div>
          <div className="space-y-8 px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="font-bold sm:text-4xl text-3xl tracking-tight">
                  Featured products
                </h1>
                <p className="text-gray-400 mt-2">
                  Hand-picked items from our top sellers this week.
                </p>
              </div>
              <Link
                href={"/shop"}
                className="border border-gray-200 px-4 py-2 h-10 flex gap-1 items-center rounded-lg text-sm font-medium disabled:pointer-events-none transition-colors duration-200 hover:bg-orange-500/10 hover:text-orange-600"
              >
                View all <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-7 gap-y-7">
              {products.map(
                (product, index) =>
                  product.badge && (
                    <ProductCard
                      product={product}
                      index={index}
                      key={product.id}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-7xl py-12 px-4 lg:px-6 sm:px-8">
          <div className="bg-linear-to-br from-orange-500 to-amber-500 via-orange-500 px-8 py-12 sm:px-12 sm:py-16 rounded-3xl">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
                  Got something to sell?
                </h1>
                <p className="text-white/90 text-lg">
                  Join Lumina as a seller and list your products in minutes.
                  Reach thousands of buyers worldwide.
                </p>
              </div>

              <Link href={"/sell"}>
                <button className="rounded-lg bg-white text-orange-500 hover:bg-white/90 px-8 h-12 shrink-0 flex justify-center items-center gap-2 font-medium">
                  Start selling <ArrowRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
