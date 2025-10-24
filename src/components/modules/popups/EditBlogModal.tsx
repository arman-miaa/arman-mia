"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { Blog } from "@/types";



interface EditBlogModalProps {
  blog: Blog;
  onClose: () => void;
  onUpdate: (updatedBlog: Blog) => void;
}

const EditBlogModal = ({ blog, onClose, onUpdate }: EditBlogModalProps) => {
  const [formData, setFormData] = useState<Blog>({ ...blog });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setFormData(blog); // আগের ডাটা preserve
  }, [blog]);

  const handleChange = (key: keyof Blog, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSave = async () => {
    setUpdating(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/blog/${formData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        toast.success("Blog updated successfully");
        onUpdate(formData);
        onClose();
      } else {
        toast.error("Failed to update blog");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-accent dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Edit Blog
        </h3>

        <div className="space-y-3">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Title"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <textarea
            value={formData.content}
            onChange={(e) => handleChange("content", e.target.value)}
            placeholder="Content"
            className="w-full border rounded-md px-3 py-2 h-24 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <input
            type="text"
            value={formData.thumbnail || ""}
            onChange={(e) => handleChange("thumbnail", e.target.value)}
            placeholder="Image URL"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={updating}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {updating ? "Updating..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlogModal;
