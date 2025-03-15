import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // لازم يكون موجود ملف dbConnect.js
import Blog from "@/models/Blog"; // لازم يكون عندك موديل للمقالات

// جلب المقالات
export async function GET() {
  try {
    await dbConnect(); // تأكد إن الاتصال بقاعدة البيانات شغال
    const blogs = await Blog.find({});
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "فشل في جلب المقالات" }, { status: 500 });
  }
}

// إضافة مقال جديد
export async function POST(req) {
  try {
    await dbConnect();
    const { title, content, imageUrl } = await req.json();

    if (!title || !content || !imageUrl) {
      return NextResponse.json({ error: "كل الحقول مطلوبة" }, { status: 400 });
    }

    const newBlog = new Blog({ title, content, imageUrl });
    await newBlog.save();

    return NextResponse.json(
      { message: "تمت إضافة المقال بنجاح!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "فشل في إضافة المقال" }, { status: 500 });
  }
}
