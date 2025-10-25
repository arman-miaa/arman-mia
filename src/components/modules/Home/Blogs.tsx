"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import TitleSection from "@/components/shared/TitleSection";
import notFoundImg from "../../../../public/assets/not-found.png";
import MainButton from "@/components/ui/MainButton";

interface Blog {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  createdAt: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`);
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data: Blog[] = await res.json();

        setBlogs(data.slice(0, 3));
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const goToBlogDetail = (id: number) => {
    router.push(`/blogs/${id}`);
  };

  const goToAllBlogs = () => {
    router.push("/blogs");
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400 text-xl">
        Loading blogs...
      </div>
    );
  }

  return (
    <section id="blogs" className="container mx-auto py-16 px-4">
      <TitleSection heading="Latest Blogs" subHeading="Our Blogs" />

      {blogs.length === 0 ? (
        <p className="text-center text-gray-400">No blogs found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-accent rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              onClick={() => goToBlogDetail(blog.id)}
            >
              {/* ✅ Safe Fallback for Image */}
              <Image
                src={
                  blog.thumbnail && blog.thumbnail.startsWith("http")
                    ? blog.thumbnail
                    : notFoundImg
                }
                width={400}
                height={250}
                alt={blog.title || "Blog image"}
                className="w-full h-48 object-cover"
                unoptimized
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = notFoundImg.src;
                }}
              />

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-mainText">
                  {blog.title}
                </h3>
                <p className="text-gray-400 mb-4">{blog.content}</p>
                <p className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <div className="text-center mt-12">
          <MainButton text="View All Blogs" onClick={goToAllBlogs} />
        </div>
      </div>
    </section>
  );
};

export default Blogs;
