"use client";

import { showConfirmToast } from "@/components/shared/ConfirmToast";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/contact-messages`,
          { credentials: "include" }
        );
        if (!res.ok) throw new Error("Failed to fetch messages");

        const data = await res.json();
        setMessages(data.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Delete message
  const handleDelete = (id: number) => {
    showConfirmToast({
      message: "Are you sure you want to delete this message?",
      confirmText: "Yes, Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/contact-messages/${id}`,
            {
              method: "DELETE",
              credentials: "include",
            }
          );
          if (!res.ok) throw new Error("Failed to delete message");

          setMessages((prev) => prev.filter((msg) => msg.id !== id));
          toast.success("Message deleted successfully");
        } catch (err) {
          console.error(err);
          toast.error("Failed to delete message");
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400 text-xl">
        Loading messages...
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">No messages found.</p>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-accent backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between border border-gray-200 dark:border-gray-700"
          >
            {/* Header with Avatar and Name */}
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3">
                {msg.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-white dark:text-gray-100 text-lg">
                  {msg.name}
                </p>
                <p className="text-sm text-foreground">
                  {msg.email}
                </p>
              </div>
            </div>

            {/* Message */}
            <p className="text-white mb-4 line-clamp-3">
              {msg.message}
            </p>

            {/* Footer with timestamp and delete */}
            <div className="flex justify-between items-center mt-auto">
              <span className="text-sm text-white bg-primary px-2 py-1 rounded-full">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
              <button
                onClick={() => handleDelete(msg.id)}
                className="flex items-center gap-1 cursor-pointer text-red-600 hover:text-red-800 font-semibold text-sm transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
