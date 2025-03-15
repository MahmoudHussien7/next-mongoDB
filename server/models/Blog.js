const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true }, // رابط الصورة من Cloudinary
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
module.exports = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
