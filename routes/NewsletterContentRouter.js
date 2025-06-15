const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middlewares/AuthMiddleware");
const {
  createNewsletter,
  getNewsletters,
  getNewsletterById,
  updateNewsletter,
  deleteNewsletter,
  sendNewsletter,
  getNewsletterAnalytics,
  uploadNewsletterImage,
  sendNewsletterToSelectedUsersWithCv,
} = require("../controllers/NewsletterContentController");
const { newsletterImageMiddleware } = require("../utils/imageUploadNewsletter");

router.get("/api/newsletters", verifyToken, getNewsletters);

router.get(
  "/api/newsletters/analytics",
  verifyToken,
  isAdmin,
  getNewsletterAnalytics
);

router.get("/api/newsletters/:id", verifyToken, getNewsletterById);

router.post("/api/newsletters", verifyToken, isAdmin, createNewsletter);

router.put("/api/newsletters/:id", verifyToken, isAdmin, updateNewsletter);

router.delete("/api/newsletters/:id", verifyToken, isAdmin, deleteNewsletter);

router.post("/api/newsletters/:id/send", verifyToken, isAdmin, sendNewsletter);
router.post("/api/newsletters/:id/send-to-candidates", verifyToken, isAdmin, sendNewsletterToSelectedUsersWithCv);

router.post(
  "/api/newsletters/image",
  verifyToken,
  isAdmin,
  newsletterImageMiddleware,
  uploadNewsletterImage
);

module.exports = router;
