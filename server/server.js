const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*", // جرب تسمح لكل المواقع (لو عايز تحصرها حط الدومين بتاعك هنا)
    methods: ["GET", "POST", "PUT", "DELETE"], // السماح بكل أنواع الريكويستات
    allowedHeaders: ["Content-Type"], // السماح بالهيدرات المطلوبة
  })
);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use("/api/blogs", blogRoutes);

app.listen(5001, () => console.log("🚀 Server running on port 5001"));
