const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

// Auth routes (all public)
router.post("/api/auth/signup", authController.signup);
router.post("/api/auth/login", authController.login);
router.post("/api/auth/refresh-token", authController.refreshToken);
router.post("/api/auth/logout", authController.logout);

module.exports = router;