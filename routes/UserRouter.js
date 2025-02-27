const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const fileUpload = require("../utils/fileUpload");
const { authenticateToken } = require("../middlewares/auth");
const { checkRole } = require("../middlewares/roleCheck");
const { User } = require("../models/UserModel");

// Public routes
router.post("/api/uploadfile", fileUpload, userController.uploadFile);
router.post("/api/adduser", userController.createUser);

// Protected routes - admin only
router.get("/api/getusers", authenticateToken, checkRole(["admin"]), userController.getUsers);
router.get("/api/users/:id", authenticateToken, checkRole(["admin"]), userController.getUserById);
router.put("/api/users/:id", authenticateToken, checkRole(["admin"]), userController.updateUser);
router.delete("/api/users/:id", authenticateToken, checkRole(["admin"]), userController.deleteUser);

// Route to get user's CV file - admin only
router.get("/api/user/:id/cv", authenticateToken, checkRole(["admin"]), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.cvFile) {
      return res.status(404).json({ message: "CV not found" });
    }
    res.redirect(user.cvFile); // Redirect to the file in the uploads directory
  } catch (error) {
    res.status(500).json({ message: "Error retrieving CV" });
  }
});

// User profile route - accessible by the user themselves and admins
router.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-password -refreshToken")
      .populate("roles");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
});

module.exports = router;