const express = require("express");
const router = express.Router();
const roleController = require("../controllers/RoleController");
const { authenticateToken } = require("../middlewares/auth");
const { checkRole } = require("../middlewares/roleCheck");

// Role management - admin only
router.post(
  "/api/roles/assign", 
  authenticateToken, 
  checkRole(["admin"]), 
  roleController.assignRolesToUser
);

module.exports = router;