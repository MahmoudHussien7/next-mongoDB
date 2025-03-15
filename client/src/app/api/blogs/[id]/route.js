import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // لازم يكون موجود ملف dbConnect.js

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const blog = await Blog.findById(params.id);

    if (!blog)
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
