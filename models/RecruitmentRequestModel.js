const mongoose = require("mongoose");

const recruitmentRequestSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    needsDescription: {
      type: String,
      required: true,
    },
    monthlyBudget: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    urgency: {
      type: String,
      required: true,
      enum: ["Très urgent", "Dans les 7 jours", "Pas pressé"],
    },
  },
  { timestamps: true }
);

const RecruitmentRequest =
  mongoose.models.RecruitmentRequest ||
  mongoose.model("recruitment_requests", recruitmentRequestSchema);

module.exports = { RecruitmentRequest };
