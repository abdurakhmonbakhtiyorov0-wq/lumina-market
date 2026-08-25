import Link from "next/link";
import React from "react";
import TinyBtn from "./ui/TinyBtn";
import { ShoppingBag } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="py-12 px-4 lg:px-6 sm:px-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-4 gap-8">
          <div className="">
            <Link className="flex items-center gap-2" href={"/"}>
              <TinyBtn
                color={"text-white bg-orange-500"}
                rounded={"rounded-xl"}
                text={<ShoppingBag size={20} />}
              />
              <span className="text-xl font-bold tracking-tight">Lumina</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-gray-500">
              A modern marketplace for curated, premium goods. Buy and sell with
              confidence.
            </p>
          </div>
          <div>
            <h1 className="mb-4 font-semibold">Shop</h1>
            <ul className="space-y-4">
              <li className="text-gray-500 hover:text-orange-500 transition-colors">
                <Link href={"/shop"}>All products</Link>
              </li>
              <li className="text-gray-500 hover:text-orange-500 transition-colors">
                <Link href={"/shop?category=Sneakers"}>Sneakers</Link>
              </li>
              <li className="text-gray-500 hover:text-orange-500 transition-colors">
                <Link href={"/shop?category=Wathes"}>Watches</Link>
              </li>
              <li className="text-gray-500 hover:text-orange-500 transition-colors">
                <Link href={"/shop?category=Audio"}>Audio</Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="mb-4 font-semibold">Sell</h1>
            <ul className="space-y-4">
              <li className="text-gray-500 hover:text-orange-500 transition-colors">
                <Link href={"/sell"}>Start selling</Link>
              </li>
              <li className="text-gray-500 hover:text-orange-500 transition-colors">
                <Link href={"/sell"}>Seller guide</Link>
              </li>
              <li className="text-gray-500 hover:text-orange-500 transition-colors">
                <Link href={"/sell"}>Pricing</Link>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="mb-4 font-semibold">Company</h1>
            <ul className="space-y-4">
              <li className="text-gray-500 hover:text-orange-500 transition-colors">
                <Link href={"/"}>About</Link>
              </li>
              <li className="text-gray-500 hover:text-orange-500 transition-colors">
                <Link href={"/"}>Careers</Link>
              </li>
              <li className="text-gray-500 hover:text-orange-500 transition-colors">
                <Link href={"/"}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 flex justify-between items-centrer text-gray-500">
          <p>© 2026 Lumina. All rights reserved. </p>
          <nav>
            <ul className="flex items-center gap-5">
              <li>
                <Link href={"/"}>Privacy</Link>
              </li>
              <li>
                <Link href={"/"}>Terms</Link>
              </li>
              <li>
                <Link href={"/"}>Cookie</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
