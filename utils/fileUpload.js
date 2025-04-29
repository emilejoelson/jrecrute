const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

// Constants
const UPLOAD_DIR = "./uploads";
const IMAGE_DIR = path.join(UPLOAD_DIR, "images");
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 5MB limit
const ALLOWED_MIMETYPES = new Set([
  "image/png",
  "image/jpg",
  "image/jpeg",
  "application/pdf",
]);

// Ensure upload directories exist
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

// Initialize directories
ensureDirectoriesExist().catch(console.error);

// Storage configuration
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

// File filter function
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

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1, // Allow only 1 file per request
  },
  fileFilter: fileFilter,
}).single("cvFile"); // Changed to cvFile to match your use case

const fileUpload = (req, res, next) => {
  upload(req, res, (err) => {
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

      // Custom errors
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }

    // No file uploaded
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "Please upload a file",
      });
    }

    // Add file path to request for later use
    req.filePath = path.join("uploads", "images", req.file.filename);
    next();
  });
};

const profileImageUpload = multer({
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
          "Invalid file type. Only PNG, JPG, and JPEG are allowed for profile images"
        ),
        false
      );
    }
    cb(null, true);
  },
}).single("profileImage");

const profileImageMiddleware = (req, res, next) => {
  profileImageUpload(req, res, (err) => {
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
    
    // Continue to the next middleware/controller
    next();
  });
};


module.exports = { fileUpload, profileImageMiddleware };
