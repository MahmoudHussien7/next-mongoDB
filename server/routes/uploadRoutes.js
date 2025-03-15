import express from "express";
import cloudinary from "../config/cloudinary.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader
      .upload_stream(
        { folder: "uploads" }, // تحديد مجلد التخزين
        (error, result) => {
          if (error) return res.status(500).json({ error: error.message });
          res.json({ imageUrl: result.secure_url });
        }
      )
      .end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
