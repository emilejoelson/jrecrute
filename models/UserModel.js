const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const languageSchema = new mongoose.Schema({
  language: { type: String, required: true },
  level: { type: String, required: true }
});

const experienceSchema = new mongoose.Schema({
  position: { type: String, required: true },
  company: { type: String, required: true },
  startMonth: { type: String, required: true },
  startYear: { type: String, required: true },
  endMonth: { type: String },
  endYear: { type: String },
});

const formationSchema = new mongoose.Schema({
  level: { type: String, required: true },
  languages: [languageSchema],
});

const personalInfoSchema = new mongoose.Schema({
  civility: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { 
    type: String, 
    required: true,
    unique: true, 
    index: true  
  },
  telephone: { type: String, required: true },
});

const professionalInfoSchema = new mongoose.Schema({
  currentPosition: { type: String, required: true },
  desiredPosition: { type: String, required: true },
  enterprise: { type: String },
  hasRemoteExperience: { type: Boolean, default: false },
  experiences: [experienceSchema],
});

const academicInfoSchema = new mongoose.Schema({
  formation: formationSchema,
  motivation: { type: String, required: true },
});

const userSchema = new mongoose.Schema(
  {
    cvFile: { type: String },
    personalInfo: personalInfoSchema,
    professionalInfo: professionalInfoSchema,
    academicInfo: academicInfoSchema,
    // New fields for authentication
    email: { 
      type: String, 
      required: true, 
      unique: true,
      index: true
    },
    password: { 
      type: String, 
      required: true 
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'roles'
    }],
    refreshToken: { type: String }
  },
  { timestamps: true }
);

// Pre-save hook to hash password
userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to validate password
userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model("users", userSchema);
module.exports = { User };