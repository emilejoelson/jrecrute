const jwt = require("jsonwebtoken");
const config = require("../config/jwtConfig");
const { User } = require("../models/UserModel");

const generateTokens = (userId, roles) => {
  // Generate access token
  const accessToken = jwt.sign(
    { 
      userId, 
      roles
    },
    config.accessToken.secret,
    { 
      // Hard-coded valid expiresIn format
      expiresIn: "90m" // 30 minutes
    }
  );

  // Generate refresh token
  const refreshToken = jwt.sign(
    { userId },
    config.refreshToken.secret,
    { 
      // Hard-coded valid expiresIn format
      expiresIn: "2w" // 2 weeks
    }
  );

  return { accessToken, refreshToken };
};

const refreshAccessToken = async (refreshToken) => {
  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, config.refreshToken.secret);
    
    // Find user with this refresh token
    const user = await User.findById(decoded.userId).populate("roles");
    if (!user || user.refreshToken !== refreshToken) {
      throw new Error("Invalid refresh token");
    }

    // Extract role IDs
    const roles = user.roles.map(role => role._id);
    
    // Generate new tokens
    const tokens = generateTokens(user._id, roles);
    
    // Update refresh token in database
    user.refreshToken = tokens.refreshToken;
    await user.save();
    
    return tokens;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

module.exports = { generateTokens, refreshAccessToken };