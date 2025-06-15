const express = require("express");
const {
  signup,
  login,
  refreshTokens,
  logout,
  getProfile,
  changePassword,
  getAllAuths,
} = require("../controllers/AuthController");
const { verifyToken, isAdmin } = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.post("/api/auth/signup", signup);
router.post("/api/auth/login", login);
router.post("/api/auth/refresh-token", refreshTokens);
router.post("/api/auth/logout", logout);

router.get("/api/user/profile", verifyToken, getProfile);
router.post("/api/settings/change-password", verifyToken, changePassword);

router.get(
  "/api/auth/all-authenticated-users",
  verifyToken,
  isAdmin,
  getAllAuths
);

router.get("/api/auth/admin", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Admin route accessed successfully" });
});

module.exports = router;
