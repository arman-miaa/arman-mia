"use client";

import TitleSection from "@/components/shared/TitleSection";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);

      
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include", 
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data?.message || "Invalid email or password ❌");
        return;
      }

      toast.success("Login successful! Welcome Admin 👑");

      console.log("Logged in user:", data.user);

      setEmail("");
      setPassword("");

      //  Redirect to Dashboard
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#191f36] px-4">
      <div className="w-full max-w-md bg-accent p-8 rounded-lg shadow-lg">
        <TitleSection heading="Welcome Back" subHeading="Admin Login" />

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label className="block text-mainText font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-mainText bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:border-[#59B2F4] transition-all duration-200"
              placeholder="Enter your admin email"
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-mainText font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 pr-10 text-mainText bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:border-[#59B2F4] transition-all duration-200"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-13 transform -translate-y-1/2 text-gray-400 hover:text-[#59B2F4]"
              tabIndex={-1}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Submit */}
          <div className="text-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`relative inline-flex justify-center items-center w-36 lg:w-40 h-12 lg:h-14 bg-transparent border-2 border-[#59B2F4] rounded-lg font-bold text-[#59B2F4] tracking-widest overflow-hidden group ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span className="absolute top-0 left-0 w-0 h-full bg-[#59B2F4] z-10 transition-all duration-500 group-hover:w-full"></span>
              <span className="relative z-20 transition-colors duration-500 group-hover:text-[#191f36]">
                {loading ? "Logging in..." : "LOGIN"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
