"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { products } from "@/app/api/products";
import Link from "next/link";
import {
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useMarket } from "@/app/store";

const badgeStyles = {
  Sale: "bg-red-500 text-white",
  New: "bg-emerald-500 text-white",
  Premium: "bg-amber-500 text-white",
};

function page() {
  const { id } = useParams();
  const addToCart = useMarket((state) => state.addToCart);

  const product = products.find((product) => product.id === id);
  const gallery = product.gallery;
  const numOfStars = Math.round(product.rating);
  const defaultImage = product.image;

  const [currentImage, setCurrentImage] = useState(defaultImage);
  const [quantity, setQuantity] = useState(1);

  const totalPrice = product ? (product.price * quantity).toFixed(2) : "0.00";

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link className="hover:text-orange-500" href={"/"}>
            Home
          </Link>
          <span>/</span>
          <Link className="hover:text-orange-500" href={"/shop"}>
            Shop
          </Link>
          <span>/</span>
          <Link
            className="hover:text-orange-500"
            href={`/shop?category=${product.category}`}
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="font-medium text-black">{product.name}</span>
        </nav>
        <div className="grid grid-cols-1 gap-8">
          <div className="relative max-w-7xl border-2 rounded-3xl border-gray-200 overflow-hidden animate-fide-in">
            <img
              className="rounded-3xl w-full object-cover"
              src={currentImage}
              alt=""
            />
            <div
              className={`absolute top-5 left-3 rounded-full ${badgeStyles[product.badge]} px-3 py-0.5 text-sm font-medium`}
            >
              {product.badge}
            </div>
          </div>
          <div className="flex gap-4">
            {gallery.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(img)}
                className={`relative border-2 h-20 w-20 transition-colors border-gray-300 rounded-xl overflow-hidden ${img === currentImage ? "border-orange-500 ring-2 ring-orange-500/20" : " hover:border-orange-500/40 "}`}
              >
                <img
                  className=" absolute inset-0 object-cover h-full w-full"
                  src={img}
                  alt=""
                />
              </button>
            ))}
          </div>
          <h3 className="texxt-sm font-medium uppercase text-orange-500 tracking-wide">
            {product.category}
          </h3>
        </div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          {product.name}
        </h1>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex gap-1">
            {Array.from({ length: numOfStars }, (_, i) => i + 1).map((num) => (
              <img className="w-3 h-3" key={num} src="/favourites.png" alt="" />
            ))}
          </div>
          <span className="text-gray-500 text-sm">
            {product.rating} <span>({product.reviews} reviews)</span>
          </span>
        </div>
        <p className="text-4xl font-extrabold mt-5!">${product.price}</p>
        <p className="text-gray-500 text-lg mt-5 leading-relaxed">
          {product.description}
        </p>
        <div className="bg-gray-100/30 border border-gray-200 rounded-xl mt-5 p-4 flex items-center gap-3">
          <div className="flex items-center justify-center bg-orange-500/10 h-10 w-10 rounded-full text-orange-500 text-sm font-bold">
            {product.seller.charAt()}
          </div>
          <div>
            <p className="text-sm font-medium">Sold by {product.seller}</p>
            <p className="text-sx text-gray-500">Trusted Seller · Verified</p>
          </div>
        </div>
        <p className="mt-4 text-sm">
          {product.stock ? (
            <span className="text-emerald-600 font-medium">
              In stock — {product.stock} available
            </span>
          ) : (
            <span className="font-medium text-red-500">Out of stock</span>
          )}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6 border-b border-gray-200 pb-8">
          <div className="border border-gray-200 rounded-lg flex items-center">
            <button
              className="w-11 h-11 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none hover:bg-orange-50 hover:text-orange-600 transition-colors"
              disabled={quantity == 1}
              onClick={() =>  setQuantity(quantity - 1)}
            >
              <Minus size={20} className="cursor-pointer" />
            </button>
            <span className="text-center font-semibold w-12">{quantity}</span>
            <button
              className="w-11 h-11 flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-colors disabled:opacity-50 disabled:pointer-events-none"
              disabled={quantity == 7}
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus size={20} className="cursor-pointer" />
            </button>
          </div>
          <button
            onClick={() => addToCart({ product, amount: quantity })}
            className="flex-1 rounded-md shadow-lg px-8 h-12 flex items-center justify-center whitespace-nowrap text-sm font-medium bg-orange-500 hover:bg-orange-400 text-white gap-2 transition-colors cursor-pointer duration-150"
          >
            <ShoppingBag size={20} />
            Add To Cart <Minus size={20} /> ${totalPrice}{" "}
          </button>
        </div>
        <div className="flex items-center justify-evenly py-8">
          <div className="flex flex-col items-center gap-1 ">
            <Truck size={20} className="text-orange-500" />
            <p className="text-gray-500 text-sm">Free shipping over $100</p>
          </div>
          <div className="flex flex-col items-center gap-1 ">
            <ShieldCheck size={20} className="text-orange-500" />
            <p className="text-gray-500 text-sm">Secure checkout</p>
          </div>
          <div className="flex flex-col items-center gap-1 ">
            <RotateCcw size={20} className="text-orange-500" />
            <p className="text-gray-500 text-sm">30-day returns</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
