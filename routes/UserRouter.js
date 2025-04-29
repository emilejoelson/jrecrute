const express = require("express");
const routerUser = express.Router();
const userController = require("../controllers/UserController");
const { User } = require("../models/UserModel");
const { verifyToken } = require("../middlewares/AuthMiddleware"); 

const { fileUpload, profileImageMiddleware } = require("../utils/fileUpload");

routerUser.get("/api/getusers", userController.getUsers);
routerUser.post("/api/adduser", userController.createUser);
routerUser.post("/api/uploadfile", fileUpload, userController.uploadFile);
routerUser.post("/api/upload-profile-image", profileImageMiddleware, userController.uploadProfileImage);
routerUser.put("/api/users/:userId/profile-image", verifyToken, profileImageMiddleware, userController.updateProfileImage);

routerUser.get("/api/user/:id/cv", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.cvFile) {
      return res.status(404).json({ message: "CV not found" });
    }
    res.redirect(user.cvFile); 
  } catch (error) {
    res.status(500).json({ message: "Error retrieving CV" });
  }
});

module.exports = routerUser;