"use client";

import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const formData = new FormData(form.current);
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const message = formData.get("message")?.toString() || "";

    try {
      setLoading(true);

      // EmailJS
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE!,
        form.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC!
      );
      toast.success("Email sent successfully!");

      // Backend POST
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/contact-messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        }
      );

      if (!res.ok) throw new Error("Failed to save message to backend");

      form.current.reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full bg-accent shadow-lg rounded-lg p-8">
      <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
        <div className="mb-2">
          <label className="block text-mainText font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 text-mainText bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:border-[#59B2F4] transition-all duration-200"
            placeholder="Enter your full name"
            required
            disabled={loading}
          />
        </div>

        <div className="mb-2">
          <label className="block text-mainText font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 text-mainText bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:border-[#59B2F4] transition-all duration-200"
            placeholder="Enter your email address"
            required
            disabled={loading}
          />
        </div>

        <div className="mb-2">
          <label className="block text-mainText font-medium mb-2">
            Message
          </label>
          <textarea
            name="message"
            rows={5}
            className="w-full px-4 py-2 text-mainText bg-transparent border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:border-[#59B2F4] transition-all duration-200 resize-none"
            placeholder="Write your message here"
            required
            disabled={loading}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`relative inline-flex justify-center items-center w-36 lg:w-40 h-12 lg:h-14 bg-transparent border-2 border-[#59B2F4] rounded-lg font-bold text-[#59B2F4] tracking-widest overflow-hidden group ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className="absolute top-0 left-0 w-0 h-full bg-[#59B2F4] z-10 transition-all duration-500 group-hover:w-full"></span>
            <span className="relative z-20 transition-colors duration-500 group-hover:text-[#191f36]">
              {loading ? "Sending..." : "SUBMIT"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
