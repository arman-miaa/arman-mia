"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Title and content are required");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title,
        content,
        thumbnail: thumbnailUrl || null,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to create blog");

      toast.success("Blog created successfully");
      setTitle("");
      setContent("");
      setThumbnailUrl("");

      router.push("/dashboard/blogs"); 
    } catch (err: unknown) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-accent dark:bg-gray-800 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-secondary text-center">
        Create New Blog
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-foreground mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-foreground mb-1">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter blog content"
            rows={6}
            required
          />
        </div>

        {/* Thumbnail URL */}
        <div>
          <label className="block text-foreground mb-1">
            Thumbnail URL
          </label>
          <input
            type="text"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Enter image URL"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
