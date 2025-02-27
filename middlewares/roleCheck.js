const { Role } = require("../models/RoleModel");
const mongoose = require("mongoose");

const checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      // Make sure user has roles array from auth middleware
      if (!req.user || !req.user.roles) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      // Get required roles from the database
      const requiredRoles = await Role.find({ 
        name: { $in: roles }
      });
      
      const requiredRoleIds = requiredRoles.map(role => role._id.toString());
      
      // Check if the user has any of the required roles
      const hasPermission = req.user.roles.some(userRoleId => 
        requiredRoleIds.includes(userRoleId.toString())
      );
      
      if (!hasPermission) {
        return res.status(403).json({ message: "Access denied. Insufficient permissions" });
      }
      
      next();
    } catch (error) {
      console.error("Role check error:", error);
      res.status(500).json({ message: "Server error during role check" });
    }
  };
};

module.exports = { checkRole };