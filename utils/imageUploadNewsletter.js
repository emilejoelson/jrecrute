const multer = require("multer");
const path = require("path");
const fs = require("fs/promises"); 
const fsSync = require("fs"); 

// Constants
const UPLOAD_DIR = "./uploads";
const IMAGE_DIR = path.join(UPLOAD_DIR, "images");
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit
const ALLOWED_MIMETYPES = new Set([
  "image/png",
  "image/jpg",
  "image/jpeg",
  "application/pdf",
]);

async function ensureDirectoriesExist() {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }

  try {
    await fs.access(IMAGE_DIR);
  } catch {
    await fs.mkdir(IMAGE_DIR, { recursive: true });
  }
}

// Call this function at initialization and handle any errors
ensureDirectoriesExist().catch(console.error);

// Function to remove existing image files
const removeExistingImage = (imagePath) => {
  try {
    if (!imagePath) return;

    // Ensure we have a valid path to delete
    const fullPath = path.isAbsolute(imagePath)
      ? imagePath
      : path.join(__dirname, "..", imagePath);

    // Check if file exists before deleting
    if (fsSync.existsSync(fullPath)) {
      fsSync.unlinkSync(fullPath);
      console.log(`Successfully deleted image: ${imagePath}`);
    } else {
      console.warn(`File not found, cannot delete: ${imagePath}`);
    }
  } catch (error) {
    console.error(`Error deleting image ${imagePath}:`, error);
    // Don't throw the error, just log it - we don't want the whole operation to fail
    // if image deletion fails
  }
};

// Configure storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      // Double-check directories exist
      await ensureDirectoriesExist();
      cb(null, IMAGE_DIR);
    } catch (error) {
      cb(new Error("Could not access upload directory"));
    }
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = path.extname(file.originalname);
    const newFilename = `${file.fieldname}-${uniqueSuffix}${fileExtension}`;
    cb(null, newFilename);
  },
});

// File filter to validate uploaded files
const fileFilter = (req, file, cb) => {
  // Check mimetype
  if (!ALLOWED_MIMETYPES.has(file.mimetype)) {
    return cb(
      new Error("Invalid file type. Allowed types: PNG, JPG, JPEG, PDF"),
      false
    );
  }

  // Additional validation if needed (e.g., check file contents)
  cb(null, true);
};

// Error handling for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: `File size exceeds limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
      });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

// Configure multer with our settings
const newsletterImageUpload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    // Only allow image types for profile pictures
    if (!["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
      return cb(
        new Error(
          "Invalid file type. Only PNG, JPG, and JPEG are allowed for newsletter image"
        ),
        false
      );
    }
    cb(null, true);
  },
}).single("image");

const newsletterImageMiddleware = (req, res, next) => {
  newsletterImageUpload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        // Multer-specific errors
        switch (err.code) {
          case "LIMIT_FILE_SIZE":
            return res.status(400).json({
              status: "error",
              message: `File too large. Maximum size is ${
                MAX_FILE_SIZE / (1024 * 1024)
              }MB`,
            });
          case "LIMIT_UNEXPECTED_FILE":
            return res.status(400).json({
              status: "error",
              message: "Unexpected field name for file upload",
            });
          default:
            return res.status(400).json({
              status: "error",
              message: `Upload error: ${err.message}`,
            });
        }
      }

      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }

    next();
  });
};

module.exports = {
  newsletterImageMiddleware,
  removeExistingImage, 
};
