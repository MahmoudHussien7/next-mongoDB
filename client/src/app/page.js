import AddPost from "@/Components/addPost";
import Navbar from "@/Components/Navbar";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <AddPost />
    </div>
  );
}
