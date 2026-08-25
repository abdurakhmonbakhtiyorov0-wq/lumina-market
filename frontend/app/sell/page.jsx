"use client";
import {
  ArrowDown,
  ArrowLeft,
  ChevronDown,
  DollarSign,
  FileText,
  ImagePlus,
  Package,
  Tag,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { categories } from "../api/products";
import SellInputs from "../components/ui/SellInputs";

function page() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [activeCat, setActiveCat] = useState("");

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl py-10 px-4 lg:px-6 sm:px-8">
        <div>
          <div>
            <Link
              className="h-10 px-4 py-2 mb-4 -ml-2 rounded-md hover:bg-orange-50
             hover:text-orange-500 transition-colors font-medium text-sm flex items-center gap-2 w-fit"
              href={"/"}
            >
              <ArrowLeft size={16} />
              Back
            </Link>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              List a product
            </h1>
            <p className="mt-2 text-gray-500">
              Fill in the details below to add your product to the marketplace.
            </p>
          </div>
          <form className="mt-8 p-8 border border-gray-100 rounded-2xl shadow-sm sm:p-8">
            <label htmlFor="" className="text-sm font-medium">
              Product image
            </label>
            <div className="p-8 mt-2 mb-8 border-2 border-dashed bg-gray-50 border-gray-200 rounded-xl hover:border-orange-300 transition-colors">
              {!url ? (
                <div className=" flex flex-col justify-center items-center text-center">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center bg-orange-500/10">
                    <ImagePlus size={24} className="text-orange-500" />
                  </div>
                  <p className="mt-3 text-sm font-medium">
                    Upload a product photo
                  </p>
                  <p className="text-gray-500 text-xs">PNG, JPG up to 5MB</p>
                  <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                    placeholder="Or paste an image URL"
                    type="text"
                    className="mt-3 py-2 px-3 flex w-[70%] h-10 placeholder:text-gray-400 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 outline-none bg-white"
                  />{" "}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 flex-col">
                  <img src={url} className="h-40 w-40 object-cover mx-auto" alt="Preview" />
                  <button onClick={() => setUrl("")} type="button" className="p-3 rounded-xl text-sm font-medium  transition-colors hover:bg-orange-500/10 hover:text-orange-500 cursor-pointer">
                    Remove
                  </button>
                </div>
              )}
            </div>
            <SellInputs
              name={"Product name *"}
              placeholder={"e.g. Aero Runner Sneakers"}
              img={
                <Tag
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
              }
            />
            <div className="grid gap-4 grid-cols-2 mt-6">
              <SellInputs
                name={"Price ($) *"}
                placeholder={"129.00"}
                type={"number"}
                step={"0,01"}
                img={
                  <DollarSign
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                }
              />
              <SellInputs
                name={"Stock quantity"}
                placeholder={"10"}
                type={"number"}
                step={"1"}
                img={
                  <Package
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                }
              />
            </div>
            <div className="grid space-y-2 mt-6">
              <label className="text-sm font-medium " htmlFor="">
                Category *
              </label>
              <button
                role="combobox"
                type="button"
                className="relative flex-1 h-10 flex justify-between items-center py-2 px-3 border border-gray-200 outline-none rounded-lg focus:ring-orange-500 focus:ring-offset-2 focus:ring-2"
              >
                {activeCat ? activeCat : <p>Select category</p>}
                <ChevronDown size={16} className="text-gray-400" />
              </button>
            </div>
            {isOpen && (
              <div className="absolute z-10 border border-gray-200 rounded-lg p-1 mt-2 bg-white w-[44%] shadow-sm">
                {categories.map((cat) => (
                  <button
                    onClick={() => {
                      (setActiveCat(cat), setIsOpen(!isOpen));
                    }}
                    key={cat}
                    className="px-8 hover:bg-orange-500/10 hover:text-orange-500 py-2 rounded-lg w-full text-start"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
            <div className="grid space-y-2 mt-6">
              <label className="text-sm font-medium " htmlFor="">
                Description *
              </label>
              <FileText
                size={16}
                className="absolute mt-10 ml-3 text-gray-500"
              />
              <textarea
                className="py-2 px-3 pl-10 border border-gray-200 outline-none rounded-lg focus:ring-orange-500 focus:ring-offset-2 focus:ring-2"
                name=""
                id=""
                placeholder="Describe your product — materials, features, condition..."
              ></textarea>
            </div>
            <button className="mt-6 bg-orange-500 text-white flex items-center justify-center rounded-xl w-full h-11 py-3 font-medium shadow-sm shadow-orange-500/30 transition-colors hover:bg-orange-400">
              Publish product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
