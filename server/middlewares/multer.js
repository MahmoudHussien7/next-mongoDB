import multer from "multer";

const storage = multer.memoryStorage(); // حفظ الصورة في الذاكرة مؤقتًا
const upload = multer({ storage });

export default upload;
