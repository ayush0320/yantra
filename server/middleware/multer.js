import multer from "multer";

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.diskStorage({}),
});

export default upload;
