"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import notFoundImg from "../../../../public/assets/not-found.png";
import { IoArrowBack } from "react-icons/io5";
import TitleSection from "@/components/shared/TitleSection";
import Image from "next/image";

interface Blog {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  createdAt: string;
}

const BlogDetail = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string>(notFoundImg.src);
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`
        );
        if (!res.ok) throw new Error("Failed to fetch blog details");
        const data: Blog = await res.json();
        setBlog(data);

        // ✅ যদি valid thumbnail থাকে, সেটাকে imageSrc এ সেট করো
        if (data.thumbnail && data.thumbnail.startsWith("http")) {
          setImageSrc(data.thumbnail);
        } else {
          setImageSrc(notFoundImg.src);
        }
      } catch (err: unknown) {
        console.error(err);
        toast.error(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400 text-xl">
        Loading blog...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20 text-gray-400 text-xl">
        Blog not found
      </div>
    );
  }

  return (
    <section className="container mx-auto py-16 px-4">
      <TitleSection heading={blog.title} subHeading="Blog Detail" />
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 cursor-pointer bg-transparent border-2 border-[#59B2F4] text-[#59B2F4] font-bold px-6 py-2 rounded-lg hover:bg-[#59B2F4] hover:text-[#191f36] transition-all duration-300"
      >
        <IoArrowBack /> Back
      </button>

      <div className="bg-accent rounded-lg shadow-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={blog.title}
          height={340}
          width={800}
          className="w-full h-96 object-cover"
          unoptimized // 🧠 Next.js image optimizer bypass
          onError={() => setImageSrc(notFoundImg.src)} // ✅ fallback safely
        />
        <div className="p-8">
          <h1 className="text-4xl font-bold text-mainText mb-4">
            {blog.title}
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            {blog.content}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
