const { User } = require("../models/UserModel.js");
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

    await newUser.save(); // Add this line to actually save the user

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
      filter.desiredPosition = new RegExp(req.query.desiredPosition, "i");
    }
    if (req.query.desiredRegion) {
      filter.desiredRegion = new RegExp(req.query.desiredRegion, "i");
    }

    const users = await User.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(); // Convert to plain JavaScript objects

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

module.exports = {
  uploadFile,
  getUsers,
  createUser,
};
