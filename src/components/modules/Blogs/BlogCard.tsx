"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import notFoundImg from "../../../../public/assets/not-found.png";
import EditBlogModal from "../popups/EditBlogModal";
import { Blog } from "@/types";
import { showConfirmToast } from "@/components/shared/ConfirmToast";



interface BlogCardProps {
  isDashboard?: boolean;
}

export const BlogCard = ({ isDashboard = false }: BlogCardProps) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data: Blog[] = await res.json();
        setBlogs(data);
      } catch {
        toast.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    showConfirmToast({
      message: "Are you sure you want to delete this blog?",
      confirmText: "Yes, Delete",
      cancelText: "Cancel",
      onConfirm: async () => {
   try {
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
       method: "DELETE",
       credentials: "include",
     });
     if (res.ok) {
       setBlogs((prev) => prev.filter((b) => b.id !== id));
       toast.success("Blog deleted successfully");
     } else toast.error("Failed to delete blog");
   } catch {
     toast.error("Error deleting blog");
   }
      },
    });


 
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-400 text-xl">
        Loading blogs...
      </div>
    );

  return (
    <section className="p-6 relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {isDashboard ? "Manage Blogs" : "All Blogs"}
      </h2>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-400">No blogs found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => {
            const thumbnail =
              blog.thumbnail && blog.thumbnail.startsWith("http")
                ? blog.thumbnail
                : notFoundImg.src;

            return (
              <div
                key={blog.id}
                className={`bg-accent dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg ${
                  !isDashboard && "cursor-pointer"
                }`}
                onClick={() => !isDashboard && router.push(`/blogs/${blog.id}`)}
              >
                <Image
                  src={thumbnail}
                  width={300}
                  height={200}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                  unoptimized
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.src = notFoundImg.src;
                  }}
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {blog.title}
                  </h3>
                  <p className="text-foreground mb-3 text-sm line-clamp-2">
                    {blog.content}
                  </p>
                  <p className="text-xs text-gray-400 mb-2">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>

                  {isDashboard && (
                    <div className="flex justify-between mt-3">
                      <button
                        onClick={() => setEditBlog(blog)}
                        className="flex items-center gap-1 cursor-pointer text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <Pencil size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="flex items-center gap-1 cursor-pointer text-red-600 hover:text-red-800 text-sm"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Modal */}
      {editBlog && (
        <EditBlogModal
          blog={editBlog}
          onClose={() => setEditBlog(null)}
          onUpdate={(updatedBlog) =>
            setBlogs((prev:Blog[]) =>
              prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
            )
          }
        />
      )}
    </section>
  );
};
