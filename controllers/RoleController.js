const { Role } = require("../models/RoleModel");
const { User } = require("../models/UserModel");

// Initialize roles (should be called once during app startup)
const initializeRoles = async () => {
  try {
    const roles = ["user", "admin"];
    
    for (const roleName of roles) {
      const exists = await Role.findOne({ name: roleName });
      if (!exists) {
        await new Role({ name: roleName }).save();
        console.log(`Created role: ${roleName}`);
      }
    }
  } catch (error) {
    console.error("Error initializing roles:", error);
  }
};

// Assign roles to user
const assignRolesToUser = async (req, res) => {
  try {
    const { userId, roles } = req.body;
    
    if (!userId || !roles || !Array.isArray(roles) || roles.length === 0) {
      return res.status(400).json({ message: "User ID and at least one role are required" });
    }
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Get role IDs
    const roleObjects = await Role.find({ name: { $in: roles } });
    if (roleObjects.length === 0) {
      return res.status(400).json({ message: "No valid roles provided" });
    }
    
    const roleIds = roleObjects.map(role => role._id);
    
    // Update user with new roles
    user.roles = roleIds;
    await user.save();
    
    res.status(200).json({
      message: "Roles assigned successfully",
      roles: roleObjects.map(role => role.name)
    });
  } catch (error) {
    console.error("Error assigning roles:", error);
    res.status(500).json({
      message: "Error assigning roles",
      error: error.message,
    });
  }
};

module.exports = {
  initializeRoles,
  assignRolesToUser
};