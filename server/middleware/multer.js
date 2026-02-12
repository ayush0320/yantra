import multer from "multer";

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
});

export default upload;
