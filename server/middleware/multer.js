import multer from "multer";

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 5MB
});

export default upload;
