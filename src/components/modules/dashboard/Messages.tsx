"use client";

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
          {
            credentials: "include",
          }
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
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure to delete this message?"
    );
    if (!confirmDelete) return;

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
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Messages
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col justify-between"
          >
            <div className="mb-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                {msg.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {msg.email}
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-200">
                {msg.message}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-xs text-gray-400">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
              <button
                onClick={() => handleDelete(msg.id)}
                className="text-red-600 hover:text-red-800 font-semibold text-sm"
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
