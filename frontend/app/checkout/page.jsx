"use client";
import { ArrowLeft, ArrowRight, CreditCard, MapPin } from "lucide-react";
import React, { useState } from "react";
import Input from "../components/ui/Input";
import { useMarket } from "../store";
import Link from "next/link";
import { useRouter } from "next/navigation";

function page() {
  const cart = useMarket((state) => state.cart);
  const clearCart = useMarket((state) => state.clearCart);
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    postal: "",
  });

  // const isEmpty = Object.values(formData).every((val) => val.trim() !== "");

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push("/completed")
    clearCart()
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
    <div className="min-h-screen">
      <div className="max-w-7xl py-10 px-4 lg:px-6 sm:px-8">
        <div>
          <h1 className="font-bold text-3xl tracking-tight sm:text-4xl">
            Checkout
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-3 mt-8 gap-8"
          >
            <div className="grid lg:col-span-2 space-y-8 ">
              <section className="rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-orange-500" size={20} />
                  <h1 className="text-lg font-semibold">Shipping address</h1>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 ">
                  <Input
                    onchange={(event) =>
                      setFormData({ ...formData, name: event })
                    }
                    val={formData.name}
                    text={"First name"}
                    placeholder={"Jane"}
                  />
                  <Input
                    onchange={(event) =>
                      setFormData({ ...formData, lastName: event })
                    }
                    val={formData.lastName}
                    text={"Last name"}
                    placeholder={"Doe"}
                  />
                  <div className="grid col-span-2">
                    <Input
                      onchange={(event) =>
                        setFormData({ ...formData, address: event })
                      }
                      val={formData.address}
                      text={"Address"}
                      placeholder={"123 Main Street"}
                    />
                  </div>
                  <Input
                    onchange={(event) =>
                      setFormData({ ...formData, city: event })
                    }
                    val={formData.city}
                    text={"City"}
                    placeholder={"San Francisco"}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      onchange={(event) =>
                        setFormData({ ...formData, zip: event })
                      }
                      val={formData.zip}
                      text={"ZIP"}
                      length={5}
                      placeholder={"94101"}
                    />
                    <Input
                      onchange={(event) =>
                        setFormData({ ...formData, country: event })
                      }
                      val={formData.country}
                      text={"Country"}
                      placeholder={"USA"}
                    />
                  </div>
                </div>
              </section>
            </div>
            <section className="rounded-2xl border border-gray-200 shadow-sm p-6 ">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="text-orange-500" size={20} />
                <h1 className="text-lg font-semibold">Shipping address</h1>
              </div>
              <div className="space-y-4 grid">
                <Input
                  onchange={(event) =>
                    setFormData({ ...formData, cardNumber: event })
                  }
                  val={formData.cardNumber}
                  text={"Card number"}
                  length={16}
                  placeholder={"1234 5678 0123 4567"}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    onchange={(event) =>
                      setFormData({ ...formData, expiry: event })
                    }
                    val={formData.expiry}
                    text={"Expiry"}
                    placeholder={"MM/YY"}
                  />
                  <Input
                    onchange={(event) =>
                      setFormData({ ...formData, cvc: event })
                    }
                    val={formData.cvc}
                    text={"CVC"}
                    length={3}
                    placeholder={"123"}
                  />
                </div>
                <Input
                  onchange={(event) =>
                    setFormData({ ...formData, postal: event })
                  }
                  val={formData.postal}
                  text={"Postal"}
                  placeholder={"94101"}
                />
              </div>
            </section>
            <section className="rounded-2xl border border-gray-200 shadow-sm p-6 grid col-span-3">
              <h1 className="text-lg font-semibold">Your order</h1>
              <div className="my-4 max-h-64 gap-3 flex flex-col pr-1 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <img
                      src={item.image}
                      className="object-cover rounded-lg h-14 w-14"
                      alt=""
                    />
                    <div className="flex justify-between w-full">
                      <h3 className="font-medium">{item.name}</h3>
                      <h3 className="font-semibold text-lg ">
                        ${(item.price * item.amount).toFixed(2)}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-gray-200 border-t">
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
                <button className="mt-5 px-8 h-11 w-full shrink-0 transition-colors rounded-md bg-orange-500 text-white flex items-center justify-center gap-3 hover:bg-orange-400 text-sm font-semibold">
                  Pay ${result}
                </button>
                <Link href={"/cart"}>
                  <button className="w-full rounded-lg flex items-center justify-center gap-3 hover:bg-orange-50 hover:text-orange-500 transition-colors h-11 py-3 font-medium">
                    <ArrowLeft size={16} /> <span>Back to card</span>
                  </button>
                </Link>
              </div>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
