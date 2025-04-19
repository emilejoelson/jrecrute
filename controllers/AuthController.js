const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Auth } = require("../models/AuthModel.js");
const { User } = require("../models/UserModel.js");

// Signup function
const signup = async (req, res) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      cvFile,
      personalInfo,
      professionalInfo,
      academicInfo,
    } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Passwords do not match", field: "confirmPassword" });
    }

    // Check if user with this email already exists in Auth collection
    const existingAuth = await Auth.findOne({ email });
    if (existingAuth) {
      return res
        .status(400)
        .json({ message: "Email already registered", field: "email" });
    }

    // Create new user record first
    const newUser = new User({
      cvFile,
      personalInfo: {
        ...personalInfo,
        email, // Make sure email is consistent
      },
      professionalInfo,
      academicInfo,
    });

    // Save the user to get the user ID
    const savedUser = await newUser.save();

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create auth record
    const newAuth = new Auth({
      email,
      password: hashedPassword,
      userId: savedUser._id,
    });

    // Save auth record
    await newAuth.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: savedUser._id, email, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: savedUser._id,
    });
  } catch (error) {
    console.error("Error during signup:", error);

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

    res.status(500).json({
      message: "Error during signup",
      error: error.message,
    });
  }
};

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the auth record
    const auth = await Auth.findOne({ email });
    if (!auth) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, auth.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Find the user record
    const user = await User.findById(auth.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: auth.email, role: auth.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
      role: auth.role,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "Error during login",
      error: error.message,
    });
  }
};

// Request password reset
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    
    const auth = await Auth.findOne({ email });
    if (!auth) {
      // For security reasons, don't tell if email exists or not
      return res.status(200).json({ 
        message: "If your email is registered, you will receive a password reset link" 
      });
    }
    
    // Generate a random token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Set expiration (1 hour from now)
    auth.resetPasswordToken = resetToken;
    auth.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
    await auth.save();
    
    // TODO: Send email with reset link
    // You would need to implement an email service here
    
    res.status(200).json({ 
      message: "If your email is registered, you will receive a password reset link" 
    });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    res.status(500).json({
      message: "Error requesting password reset",
      error: error.message,
    });
  }
};

// Middleware to verify token (for protected routes)
const verifyToken = (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user data to request
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  signup,
  login,
  requestPasswordReset,
  verifyToken
};