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

const uploadProfileImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const filePath = req.file.path;

    // If a user ID is provided, update their profile image
    if (req.body.userId) {
      const user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Delete the old profile image if it exists
      if (user.profileImage) {
        const oldImagePath = path.resolve(__dirname, "../", user.profileImage);
        if (fs.existsSync(oldImagePath)) {
          try {
            fs.unlinkSync(oldImagePath);
          } catch (err) {
            console.error("Error deleting old profile image:", err);
          }
        }
      }

      // Update the user's profile image
      user.profileImage = filePath;
      await user.save();
    }

    return res.status(200).json({
      message: "Profile image uploaded successfully",
      filePath: filePath,
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res
      .status(500)
      .json({ message: "Error uploading profile image", error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      cvFile,
      profileImage,
      personalInfo,
      professionalInfo,
      academicInfo,
    } = req.body;

    // Check CV file existence
    if (cvFile) {
      const filePath = path.resolve(__dirname, "../", cvFile);
      if (!fs.existsSync(filePath)) {
        return res.status(400).json({ message: "CV file does not exist" });
      }
    }

    const existingUser = await User.findOne({
      "personalInfo.email": personalInfo.email,
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({
      cvFile,
      profileImage, // Add profileImage field
      personalInfo,
      professionalInfo,
      academicInfo,
    });

    await newUser.save();

    // Send email if CV file exists
    if (cvFile) {
      await sendEmailToCompany({
        personalInfo,
        professionalInfo,
        academicInfo,
        cvFile: path.resolve(__dirname, "../", cvFile),
      });
    }

    res.status(201).json({
      message: "User created successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error creating user:", error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already registered",
        field: "email",
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

const updateProfileImage = async (req, res) => {
  try {
    const { userId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the old profile image if it exists
    if (user.profileImage) {
      const oldImagePath = path.resolve(__dirname, "../", user.profileImage);
      try {
        await fs.promises.access(oldImagePath);
        await fs.promises.unlink(oldImagePath);
      } catch (err) {
        console.error("Error deleting old profile image:", err);
      }
    }

    user.profileImage = file.path;
    await user.save();

    return res.status(200).json({
      message: "Profile image updated successfully",
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res
      .status(500)
      .json({ message: "Error updating profile image", error: error.message });
  }
};

const getUsersWithCvNotNull = async (req, res) => {
  try {
    const filter = {
      cvFile: { $ne: null },
    };

    // Add optional filters
    if (req.query.desiredPosition) {
      filter["professionalInfo.desiredPosition"] = new RegExp(
        req.query.desiredPosition,
        "i"
      );
    }
    if (req.query.desiredRegion) {
      filter.desiredRegion = new RegExp(req.query.desiredRegion, "i");
    }

    const users = await User.find(filter).lean(); // No pagination

    res.json({
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
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
  uploadProfileImage,
  updateProfileImage,
  getUsersWithCvNotNull,
};
