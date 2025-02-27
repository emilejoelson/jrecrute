const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      unique: true,
      enum: ["user", "admin"]
    },
  },
  { timestamps: true }
);

const Role = mongoose.models.Role || mongoose.model("roles", roleSchema);

module.exports = { Role };