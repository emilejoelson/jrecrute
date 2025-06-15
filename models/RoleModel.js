const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Role name is required"],
      unique: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    permissions: {
      type: [String],
      default: []
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Role = mongoose.models.Role || mongoose.model("role", roleSchema);

module.exports = { Role };