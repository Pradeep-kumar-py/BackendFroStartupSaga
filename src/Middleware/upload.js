import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";
import cloudinary from "../lib/cloudinary.js"; // Adjust the path as necessary

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "uploads"; // Default folder in Cloudinary
    let resourceType = "auto"; // Auto-detect for images, PDFs, and other files

    if (file.mimetype.startsWith("image/")) {
      folder = "images"; // Store images separately
    } else if (file.mimetype === "application/pdf") {
      folder = "pdfs"; // Store PDFs separately
      resourceType = "raw"; // PDFs should be uploaded as 'raw'
    }

    return { folder, resource_type: resourceType };
  },
});

const upload = multer({ storage });

export default upload;
