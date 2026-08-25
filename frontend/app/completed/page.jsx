import { Check } from "lucide-react";
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
          Order confirmed!
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Thank you for your purchase. A confirmation email is on its way.
        </p>
        <Link href={"/shop"}>
          <button className="shadow-lg text-sm font-medium shadow-orange-500/30 rounded-lg bg-orange-500 text-white px-8 mt-8 h-11 cursor-pointer hover:bg-orange-400 transition-colors">
            Continue shopping
          </button>
        </Link>{" "}
      </div>
    </div>
  );
}

export default page;