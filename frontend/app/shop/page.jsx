"use client";

import React, { useEffect, useMemo, useState } from "react";
// import { products } from "../api/products";
import { categories } from "../api/products";
import {
  ArrowDown,
  Check,
  ChevronDown,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useProduct } from "../context/ProductRoutes";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top rated" },
];

function page() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const {products = [], setProducts} = useProduct()
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activePrice, setActivePrice] = useState("Featured");
  const [sort, setSort] = useState("featured");
  const [searchVal, setSearchVal] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    setActiveCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter(
        (p) => p.category?.toLowerCase() === activeCategory.toLowerCase(),
      );
    }

    if (searchVal.trim()) {
      const q = searchVal.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [activeCategory, activePrice, searchVal, sort, products]);

  return (
    <div className="min-h-screen px-4 lg:px-6 sm:px-8 py-10">
      <div className="max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl tracking-tight font-bold">
            Shop all products
          </h1>
          <p className="mt-2 text-gray-500">{filtered.length} items avilable</p>
        </div>
        <form className="flex items-center gap-3 mb-6 relative">
          <div className="relative flex-1 h-10">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full absolute h-10 px-3 py-2 shrink-0 focus-visible:ring-2 border border-gray-200 focus-visible:ring-orange-500 focus-visible:ring-offset-2 outline-none rounded-md file:border-0 pl-10"
              type="text"
            />
          </div>{" "}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className={`w-full sm:w-55 px-3 py-2 h-10 rounded-lg shrink-0 flex items-center justify-between border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 `}
          >
            <SlidersHorizontal size={20} />
            <span>{activePrice}</span>
            <ChevronDown
              size={20}
              className={`${isOpen ? "rotate-180" : ""} transition-all`}
            />
          </button>
          <div
            className={`absolute z-10 top-15 border bg-white border-gray-200 shadow-lg p-1 right-0 flex flex-col rounded-2xl transition-all ${isOpen ? "opacity-100" : "opacity-0"}`}
          >
            {sortOptions.map((item) => (
              <div
                onClick={() => {
                  (setActivePrice(item.label),
                    setIsOpen(!isOpen),
                    setSort(item.value));
                }}
                className="relative w-full pr-12 pl-10 py-1 hover:bg-orange-500/10 rounded-lg hover:text-orange-500 transition-colors"
                key={item.value}
              >
                {item.label}

                {activePrice === item.label && (
                  <Check
                    size={16}
                    className="absolute top-1/2 -translate-1/2 left-4"
                  />
                )}
              </div>
            ))}
          </div>
        </form>
        {isOpen && (
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="absolute inset-0"
          ></div>
        )}
        <div className="flex flex-wrap mb-8 gap-8">
          <button
            onClick={() => setActiveCategory("All")}
            className={`${activeCategory === "All" ? "bg-orange-500 text-white border-orange-500" : "border-gray-200 hover:border-orange-500 hover:bg-orange-50"} rounded-full px-4 py-2 border font-medium transition-colors`}
          >
            All
          </button>

          {categories.map((item) => (
            <button
              onClick={() => setActiveCategory(item)}
              key={item}
              className={`${activeCategory === item ? "bg-orange-500 text-white border-orange-500" : "border-gray-200 hover:border-orange-500 hover:bg-orange-50"} rounded-full px-4 py-2 border font-medium   transition-colors`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-7 gap-y-7">
          {filtered.map((product, index) => (
            <ProductCard product={product} index={index} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );  
}

export default page;
