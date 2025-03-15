"use client"; // نحول الملف إلى use client

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

async function getBlog(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export default function Page() {
  const params = useParams();
  const id = params?.id;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      async function fetchData() {
        const data = await getBlog(id);
        setBlog(data);
        setLoading(false);
      }
      fetchData();
    }
  }, [id]);

  if (loading) return <p className="text-gray-500">⏳ تحميل البوست...</p>;

  if (!blog) {
    return <p className="text-red-500">⚠️ خطأ: البوست غير موجود.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-gray-500">✍️ {blog.author}</p>
      <p className="mt-4">{blog.content}</p>
      {blog.imageUrl && (
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          width={500}
          height={300}
          className="object-cover mt-4"
        />
      )}
    </div>
  );
}
