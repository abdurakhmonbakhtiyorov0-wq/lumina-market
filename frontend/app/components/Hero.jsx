import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import BigButton from "./ui/BigButton";
import Link from "next/link";

function Hero() {
  return (
    <section className="min-h-screen relative flex items-center overflow-hidden ">
      <div className="absolute inset-0 -z-10">
        <img
          src={
            "https://images.pexels.com/photos/5531709/pexels-photo-5531709.jpeg?auto=compress&cs=tinysrgb&w=1920"
          }
          sizes="100wh"
          fill="true"
          priority="true"
          className=" w-full h-screen"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/20"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
      </div>
      <div className="mx-auto max-w-7xl w-full px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="px-4 py-1.5 flex gap-2 items-center rounded-4xl font-medium text-sm bg-white/10 border-white/20 border w-fit text-white backdrop-blur animate-fide-up" >
            <Sparkles size={20} className="text-orange-300" />
            New season collection live
          </div>
          <h1
            className="text-white leading-[1.05] font-extrabold text-5xl my-6 text-balance sm:text-6xl lg:text-7xl tracking-tight animate-fide-up"
            style={{ animationDelay: "80ms" }}
          >
            Curated goods,{" "}
            <span className="text-orange-500">delivered to you.</span>
          </h1>
          <p
            className="text-xl text-gray-200 leading-relaxed max-w-xl animate-fide-up mb-8"
            style={{ animationDelay: "160ms" }}
          >
            Discover premium products from independent sellers worldwide — or
            list your own and reach thousands of buyers.
          </p>
          <div
            className="flex gap-4 items-center animate-fide-up"
            style={{ animationDelay: "240ms" }}
          >
            <Link href={"/shop"}>
              <BigButton
                bg={"bg-orange-500"}
                text={"Shop now"}
                img={<ArrowRight size={20} />}
                shadow={"shadow-orange-500/30"}
                color={"text-white"}
                hover={"hover:bg-orange-600"}
              />
            </Link>
            <Link href={"/sell"}>
              <BigButton
                bg={"bg-white/10"}
                text={"Start  selling"}
                color={"text-white"}
                hover={"hover:bg-white/20"}
                border={true}
              />
            </Link>
          </div>
          <div
            className="flex gap-x-8 gap-y-4 items-center mt-12 animate-fide-up"
            style={{ animationDelay: "320ms" }}
          >
            <h3 className="flex items-center gap-2 text-white/80 text-sm">
              <ShieldCheck size={20} className="text-emerald-400" />
              Secure checkout
            </h3>
            <h3 className="flex items-center gap-2 text-white/80 text-sm">
              <Truck size={20} className="text-amber-400" />
              Free shipping over $100
            </h3>
            <h3 className="flex items-center gap-2 text-white/80 text-sm">
            <Sparkles size={20} className="text-amber-600"/>
              4.8 avg seller ratin
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
