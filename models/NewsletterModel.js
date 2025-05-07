const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      lowercase: true
    },
    isConfirmed: { 
      type: Boolean, 
      default: false 
    },
    confirmationToken: { 
      type: String 
    },
    confirmationExpires: { 
      type: Date 
    }
  },
  { timestamps: true }
);

const Newsletter = mongoose.models.Newsletter || mongoose.model("newsletters", newsletterSchema);
module.exports = { Newsletter };