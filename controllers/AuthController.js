const { User } = require("../models/UserModel");
const { Role } = require("../models/RoleModel");
const { generateTokens, refreshAccessToken } = require("../utils/tokenUtils");

// Sign up a new user
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Find default user role
    const userRole = await Role.findOne({ name: "user" });
    if (!userRole) {
      return res.status(500).json({ message: "Default role not found" });
    }

    // Create new user with minimal required fields
    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
      roles: [userRole._id],
      personalInfo: {
        firstName,
        lastName,
        email,
        civility: "not specified",
        telephone: "not specified"
      },
      professionalInfo: {
        currentPosition: "not specified",
        desiredPosition: "not specified",
        experiences: []
      },
      academicInfo: {
        formation: {
          level: "not specified",
          languages: []
        },
        motivation: "not specified"
      }
    });

    // Generate tokens
    const tokens = generateTokens(newUser._id, [userRole._id]);
    newUser.refreshToken = tokens.refreshToken;

    // Save the user
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });
  } catch (error) {
    console.error("Error during signup:", error);
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "Email already registered",
        field: "email"
      });
    }
    
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }
    
    res.status(500).json({ 
      message: "Error creating user", 
      error: error.message 
    });
  }
};

// Login existing user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email }).populate("roles");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    // Validate password
    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    // Extract role IDs
    const roleIds = user.roles.map(role => role._id);
    
    // Generate tokens
    const tokens = generateTokens(user._id, roleIds);
    
    // Update refresh token in the database
    user.refreshToken = tokens.refreshToken;
    await user.save();
    
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ 
      message: "Error during login", 
      error: error.message 
    });
  }
};

// Refresh tokens
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }
    
    const tokens = await refreshAccessToken(refreshToken);
    
    res.status(200).json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

// Logout user
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    // Find user with this refresh token and remove it
    await User.findOneAndUpdate(
      { refreshToken },
      { $set: { refreshToken: null } }
    );
    
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ 
      message: "Error during logout", 
      error: error.message 
    });
  }
};

module.exports = {
  signup,
  login,
  refreshToken,
  logout
};