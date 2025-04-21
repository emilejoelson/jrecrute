const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
  language: { type: String, required: true },
  level: { type: String }
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
  level: { type: String },
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

// yearsOfExperience: { type: String, required: true },
const professionalInfoSchema = new mongoose.Schema({
  currentPosition: { type: String },
  desiredPosition: { type: String },
  enterprise: { type: String },
  hasRemoteExperience: { type: Boolean, default: false },
  experiences: [experienceSchema],
});

const academicInfoSchema = new mongoose.Schema({
  formation: formationSchema,
  motivation: { type: String },
});

const userSchema = new mongoose.Schema(
  {
    cvFile: { type: String },
    personalInfo: personalInfoSchema,
    professionalInfo: professionalInfoSchema,
    academicInfo: academicInfoSchema,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("users", userSchema);
module.exports = { User };
