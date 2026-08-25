import { Check, Package } from "lucide-react";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="min-h-[90vh]">
      <div className="max-w-lg mx-auto flex flex-col items-center justify-center px-4 py-12 text-center animate-fide-up">
        <div className="rounded-full bg-emerald-100 h-20 w-20 flex items-center justify-center">
          <Check size={40} className="text-emerald-600" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          Product listed!
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Your product is now live on Lumina. Buyers can discover it in the
          shop.
        </p>
        <div className="flex gap-3">
          <Link href={"/sell"}>
            <button className="text-sm flex items-center gap-2 font-medium rounded-lg bg-orange-500 text-white px-8 mt-8 h-11 cursor-pointer hover:bg-orange-400 transition-colors">
              <Package size={16} className="text-white" /> <p>List anoter</p>
            </button>
          </Link>
          <Link href={"/shop"}>
            <button className="text-sm flex items-center gap-2 font-medium rounded-lg px-8 mt-8 h-11 cursor-pointer hover:bg-orange-50 transition-colors border border-gray-200 hover:text-orange-500">
              View shop
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
