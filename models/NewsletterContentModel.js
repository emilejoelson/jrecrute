const mongoose = require("mongoose");

const newsletterContentSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true,
      trim: true
    },
    description: { 
      type: String, 
      required: true,
      trim: true
    },
    image: { 
      type: String, 
      default: null
    },
    publishFrequency: { 
      type: String, 
      required: true,
      enum: ["daily", "weekly", "biweekly", "monthly", "quarterly"]
    },
    content: { 
      type: String,
      default: ""
    },
    publishDate: { 
      type: Date,
      default: null
    },
    status: { 
      type: String, 
      enum: ["draft", "scheduled", "published"],
      default: "draft"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    sentToSubscribers: {
      type: Boolean,
      default: false
    },
    recipientCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const NewsletterContent = mongoose.models.NewsletterContent || mongoose.model("NewsletterContent", newsletterContentSchema);
module.exports = { NewsletterContent };