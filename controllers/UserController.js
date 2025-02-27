const { User } = require("../models/UserModel");
const sendEmailToCompany = require("../utils/MailService.js");
const fs = require("fs");
const path = require("path");

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    return res.status(200).json({
      message: "File uploaded successfully",
      filePath: filePath,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Error uploading file", error });
  }
};

const createUser = async (req, res) => {
  try {
    const { cvFile, personalInfo, professionalInfo, academicInfo } = req.body;

    const filePath = path.resolve(__dirname, "../", cvFile);
    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ message: "CV file does not exist" });
    }

    const existingUser = await User.findOne({
      "personalInfo.email": personalInfo.email,
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({
      cvFile,
      personalInfo,
      professionalInfo,
      academicInfo,
    });

    await newUser.save();

    await sendEmailToCompany({
      personalInfo,
      professionalInfo,
      academicInfo,
      cvFile: filePath,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "Email already registered",
        field: "email"
      });
    }
    
    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }
    
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filter = {};

    // Add optional filters
    if (req.query.desiredPosition) {
      filter["professionalInfo.desiredPosition"] = new RegExp(req.query.desiredPosition, "i");
    }
    if (req.query.desiredRegion) {
      filter["professionalInfo.desiredRegion"] = new RegExp(req.query.desiredRegion, "i");
    }

    const users = await User.find(filter)
      .select("-password -refreshToken") // Exclude sensitive fields
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await User.countDocuments(filter);

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id)
      .select("-password -refreshToken") // Exclude sensitive fields
      .populate("roles")
      .lean();
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({
      user
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};

// Update user profile
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Prevent updating sensitive fields
    delete updateData.password;
    delete updateData.refreshToken;
    delete updateData.roles;
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password -refreshToken");
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};

module.exports = {
  uploadFile,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};