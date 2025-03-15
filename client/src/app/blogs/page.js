import Link from "next/link";

const getBlogs = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/blogs"); // تأكد أن هذا المسار صحيح
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto p-4">
      <addPost />
      <h1 className="text-3xl font-bold mb-4">📝 المدونة</h1>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id} className="border p-4 rounded-lg mb-4 shadow">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p>{blog.content.slice(0, 100)}...</p>
            <p className="text-gray-500">✍️ {blog.author}</p>
            <Link href={`/blogs/${blog._id}`}>
              <button className="mt-2 text-blue-500 hover:underline">
                قراءة المزيد →
              </button>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-500">لا يوجد بوستات بعد.</p>
      )}
    </div>
  );
}
