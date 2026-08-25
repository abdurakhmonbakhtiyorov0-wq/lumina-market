"use client";
import axios from "axios";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShoppingBag,
  User,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../context/AuthRoutes";
import { useRouter } from "next/navigation";

function page() {
  const [isLock, setIsLock] = useState(true);
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secondPassword: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (Number(form.password) !== Number(form.secondPassword)) {
        return setError("Passwords diferrent please try again");
      }

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form,
        { withCredentials: true },
      );

      setUser(res.data.user);
      console.log(res)
      router.push("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      setError(errorMessage);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4">
      <div className="grid grid-cols-1 gap-6 w-full max-w-md animate-fide-up">
        <div className="mb-2 text-center items-center flex flex-col">
          <Link href={"/"} className="flex items-center gap-2">
            <div className="rounded-xl bg-orange-500 text-white flex items-center justify-center h-11 w-11 shadow-lg shadow-orange-500/30 ">
              <ShoppingBag size={20} />
            </div>
          </Link>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-gray-500">
            Join Lumina to buy and sell premium products
          </p>
        </div>
        <form
          onSubmit={handleRegister}
          className="rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm"
        >
          <div className="flex flex-col space-y-5">
            <div className="space-y-3 grid">
              <label className="text-sm font-medium  leading-none">
                Full name
              </label>
              <div className="relative">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  type="text"
                  required
                  className="border placeholder:text-gray-500 border-gray-200 pl-10 pr-3 py-2 relative outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg h-10  w-full"
                  placeholder="Jane Doe"
                />
                <User
                  size={16}
                  className="text-gray-500 absolute left-5 top-1/2 -translate-1/2"
                />
              </div>
            </div>
            <div className="space-y-3 grid">
              <label className="text-sm font-medium  leading-none">Email</label>
              <div className="relative">
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  type="email"
                  required
                  className="border placeholder:text-gray-500 border-gray-200 pl-10 pr-3 py-2 relative outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg h-10  w-full"
                  placeholder="JaneDoe@gmail.com"
                />
                <Mail
                  size={16}
                  className="text-gray-500 absolute left-5 top-1/2 -translate-1/2"
                />
              </div>
            </div>
            <div className="space-y-3 grid">
              <label className="text-sm font-medium  leading-none">
                Password
              </label>
              <div className="relative">
                <input
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  type={isLock ? "password" : "text"}
                  required
                  className="border placeholder:text-gray-500 border-gray-200 px-10 py-2 relative outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg h-10  w-full"
                  placeholder="At least 6 characters"
                />
                <Lock
                  size={16}
                  className="text-gray-500 absolute left-5 top-1/2 -translate-1/2"
                />
                <button
                  type="button"
                  onClick={() => setIsLock(!isLock)}
                  className="cursor-pointer"
                >
                  {isLock ? (
                    <Eye
                      size={16}
                      className="text-gray-500 absolute right-3 top-1/2 -translate-1/2"
                    />
                  ) : (
                    <EyeOff
                      size={16}
                      className="text-gray-500 absolute right-3 top-1/2 -translate-1/2"
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-3 grid">
              <label className="text-sm font-medium  leading-none">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  value={form.secondPassword}
                  onChange={(e) =>
                    setForm({ ...form, secondPassword: e.target.value })
                  }
                  type="password"
                  required
                  className="border placeholder:text-gray-500 border-gray-200 pl-10 pr-3 py-2 relative outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg h-10  w-full"
                  placeholder="Re-enter password"
                />
                <Lock
                  size={16}
                  className="text-gray-500 absolute left-5 top-1/2 -translate-1/2"
                />
              </div>
            </div>
            <p className="text-sm text-red-500 font-medium text-center">
              {error}
            </p>
            <button className="rounded-xl shadow-lg shadow-orange-500/30 bg-orange-500 w-full h-11 flex items-center justify-center text-sm text-white font-medium hover:bg-orange-400 transition-colors gap-2">
              <span>Create account</span> <ArrowRight />
            </button>
            <div className="text-xs text-gray-500 text-center">
              By signing up, you agree to our{" "}
              <span className="underline">Terms</span> and{" "}
              <span className="underline">Privacy Policy.</span>
            </div>
          </div>
        </form>
        <div className="text-center flex items-center w-full justify-center text-gray-500 text-sm gap-2">
          Already have an account?{" "}
          <Link
            className="text-orange-500 font-medium hover:underline  "
            href={"/login"}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
