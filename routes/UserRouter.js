const express = require("express");
const routerUser = express.Router();
const userController = require("../controllers/UserController");
const fileUpload = require("../utils/fileUpload");

// API routes
routerUser.get("/api/getusers", userController.getUsers);
routerUser.post("/api/adduser", userController.createUser);
routerUser.post("/api/uploadfile", fileUpload, userController.uploadFile);
// Add a route to get user's CV file
routerUser.get("/api/user/:id/cv", async (req, res) => {
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

module.exports = routerUser;
