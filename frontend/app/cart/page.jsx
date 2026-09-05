"use client";
import React from "react";
import { useMarket } from "../store";
import {
  ArrowLeft,
  ArrowRight,
  icons,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function page() {
  const cart = useMarket((state) => state.cart);
  const addToCart = useMarket((state) => state.addToCart);
  const removeProduct = useMarket((state) => state.removeProduct);
  const changeAmount = useMarket((state) => state.changeAmount);
  const productsAmount = cart?.reduce((acc, item) => acc + item.amount, 0);
  const notify = (productName) => {
    toast(`${productName} was deleted from cart`);
  };

  const subtotal = cart?.reduce(
    (acc, item) => acc + item.price * item.amount,
    0,
  );
  const totalPrice = cart?.reduce(
    (acc, item) => acc + item.price * item.amount,
    0,
  );
  const tax = Number(subtotal * 0.08);

  const result = totalPrice + tax;

  return (
    <div className="min-h-[90vh]">
      {cart.length === 0 ? (
        <div className=" ">
          <div className="flex flex-col items-center max-w-lg mx-auto justify-center px-4 p text-center h-[90vh] py-12">
            <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
              <ShoppingBag size={40} className="text-gray-500" />
            </div>
            <h1 className="mt-6 text-2xl font-bold tracking-tight">
              Your cart is empty
            </h1>
            <p className="mt-2 text-gray-500">
              Looks like you haven't added anything yet.
            </p>
            <Link
              href={"/shop"}
              className="rounded-lg bg-orange-500 text-white flex justify-center items-center gap-2 hover:bg-orange-400  text-sm font-medium px-8 h-11 mt-6"
            >
              <p>Browse products</p> <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl px-4 py-10 lg:px-6 sm:px-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Shopping cart
            </h1>
            <p className="mt-2 text-gray-500">
              {productsAmount} item in your cart
            </p>
          </div>
          <div className="mt-8 flex gap-8">
            <div className="max-w-200 w-full">
              <div className="space-y-4">
                {cart?.map((product) => {
                  return (
                    <div
                      key={product.id}
                      className="flex gap-4 rounded-2xl border border-gray-200 p-4 animate-fide-up"
                    >
                      <Link href={`/shop/${product.id}`}>
                        <img
                          className="h-24 w-24 shrink-0 overflow-hidden rounded-xl"
                          src={product.image}
                          alt=""
                        />
                      </Link>
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between gap-2 items-start">
                          <div>
                            <Link
                              href={`/shop/${product.id}`}
                              className="leading-tight font-semibold hover:text-orange-500"
                            >
                              {product.name}
                            </Link>
                            <p className="mt-0.5 text-xs text-gray-500">
                              {product.category} · {product.seller}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              (removeProduct(product.id), notify(product.name));
                            }}
                            className="h-8 w-8 shrink-0 rounded-md text-gray-500 flex items-center justify-center font-medium text-sm hover:bg-orange-50 hover:text-orange-500 transition-colors duration-300"
                          >
                            <Trash2 size={16} className={""} />
                          </button>
                        </div>
                        <div className="flex justify-between gap-2 items-end">
                          <div className="border border-gray-200 rounded-xl flex items-center mt-5.75">
                            <button
                              className="w-8 h-8 rounded-l-xl flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none hover:bg-orange-50 hover:text-orange-600 transition-colors"
                              onClick={() => changeAmount(product.id, -1)}
                            >
                              <Minus size={20} className="cursor-pointer" />
                            </button>
                            <span className="text-center font-semibold w-10 text-sm">
                              {product.amount}
                            </span>
                            <button
                              className="w-8 h-8 rounded-r-xl flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                              onClick={() => changeAmount(product.id, +1)}
                            >
                              <Plus size={20} className="cursor-pointer" />
                            </button>
                          </div>
                          <h3 className="font-semibold text-lg ">
                            ${(product.price * product.amount).toFixed(2)}
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link
                href={"/shop"}
                type="button"
                className="px-4 py-2 h-10 mt-4 -ml-2 inline-flex items-center gap-2 rounded-md whitespace-nowrap text-sm font-medium transition-colors hover:bg-orange-50 hover:text-orange-500"
              >
                <ArrowLeft size={16} />
                <span>Continue shopping</span>
              </Link>
            </div>
            <div className="border border-gray-200 rounded-2xl sticky top-24 flex-1 p-6 shadow-sm h-72">
              <h1 className="text-lg font-semibold">Order summary</h1>
              <div className="space-y-3 mt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax (8%)</span>
                  <span>{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200 font-bold">
                  <span>Total</span>
                  <span>${result.toFixed(2)}</span>
                </div>
              </div>
              <Link href={"/checkout"}>
                <button className="mt-5 px-8 h-11 w-full shrink-0 transition-colors rounded-md bg-orange-500 text-white flex items-center justify-center gap-3 hover:bg-orange-400 text-sm font-mediun">
                  Proceed to checkout <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={7000}
        hideProgressBar
      />
    </div>
  );
}

export default page;
