const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config(); // لتحميل المتغيرات من ملف .env

const uri = process.env.MONGO_URI; // استخدم متغير البيئة بدل ما تكتبه في الكود مباشرة

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // اخرج من البرنامج في حالة الخطأ
  }
}

module.exports = { client, connectDB };
