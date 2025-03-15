"use client";
import { useState } from "react";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

  const handleImageUpload = async () => {
    if (!image) return "";

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ml_default"); // استبدلها بالبريست الصحيح من Cloudinary

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("فشل في رفع الصورة");

      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error("خطأ في تحميل الصورة:", error);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await handleImageUpload(); // تحميل الصورة إن وجدت

      console.log("Image URL:", imageUrl);

      const res = await fetch("http://localhost:5001/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          imageUrl,
          author: "esm elkatb",
        }),
      });

      if (!res.ok) throw new Error("فشل في إرسال البيانات");

      const data = await res.json();
      alert("تم إضافة المقال بنجاح!");
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("خطأ أثناء إضافة المقال:", error);
      alert("حدث خطأ أثناء إضافة المقال.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        placeholder="العنوان"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full text-amber-900"
        required
      />
      <textarea
        placeholder="المحتوى"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full text-amber-900"
        required
      ></textarea>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-2 w-full mt-2 text-amber-800 bg-amber-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-amber-950 p-2 mt-2"
      >
        {loading ? "جاري الإضافة..." : "إضافة مقال"}
      </button>
    </form>
  );
};

export default AddPost;
