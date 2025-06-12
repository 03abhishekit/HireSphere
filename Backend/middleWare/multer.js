// utils/multer.js
import multer from "multer";

const storage = multer.memoryStorage();
const singleUpload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF or Word documents are allowed!"), false);
  }
  }
}).single("file"); 

export { singleUpload };