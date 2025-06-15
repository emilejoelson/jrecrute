const { NewsletterContent } = require("../models/NewsletterContentModel.js");
const { Newsletter } = require("../models/NewsletterModel.js");
const { User } = require("../models/UserModel.js");
const {
  batchSendNewsletter,batchSendNewsletterToUsers
} = require("../utils/NewsletterContentEmailService.js");

const { removeExistingImage } = require("../utils/imageUploadNewsletter.js");
const path = require("path");
const fs = require("fs");

const getNewsletters = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const status = req.query.status ? { status: req.query.status } : {};

    const newsletters = await NewsletterContent.find(status)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "createdBy",
        select: "personalInfo.firstName personalInfo.lastName",
        model: User,
      });

    const total = await NewsletterContent.countDocuments(status);

    res.status(200).json({
      newsletters,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    res.status(500).json({
      message: "Error fetching newsletters",
      error: error.message,
    });
  }
};

const createNewsletter = async (req, res) => {
  try {
    const { title, description, publishFrequency, content, status, image } =
      req.body;

    const userId = req.user.userId;

    const newNewsletter = new NewsletterContent({
      title,
      description,
      image: image || null,
      publishFrequency,
      content,
      status: status || "draft",
      createdBy: userId,
    });

    const savedNewsletter = await newNewsletter.save();

    res.status(201).json({
      message: "Newsletter created successfully",
      newsletter: savedNewsletter,
    });
  } catch (error) {
    console.error("Error creating newsletter:", error);
    res.status(500).json({
      message: "Error creating newsletter",
      error: error.message,
    });
  }
};

const getNewsletterById = async (req, res) => {
  try {
    const newsletterId = req.params.id;

    const newsletter = await NewsletterContent.findById(newsletterId).populate({
      path: "createdBy",
      select: "personalInfo.firstName personalInfo.lastName",
      model: User,
    });

    if (!newsletter) {
      return res.status(404).json({ message: "Newsletter not found" });
    }

    res.status(200).json(newsletter);
  } catch (error) {
    console.error("Error fetching newsletter:", error);
    res.status(500).json({
      message: "Error fetching newsletter details",
      error: error.message,
    });
  }
};

// Update a newsletter
const updateNewsletter = async (req, res) => {
  try {
    const newsletterId = req.params.id;
    const { title, description, publishFrequency, content, status } = req.body;
    const updateFields = {};

    // Update only provided fields
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (publishFrequency) updateFields.publishFrequency = publishFrequency;
    if (content) updateFields.content = content;
    if (status) updateFields.status = status;

    // Handle image upload if present
    if (req.file) {
      updateFields.image = req.file.path;

      // Delete old image if exists
      const oldNewsletter = await NewsletterContent.findById(newsletterId);
      if (oldNewsletter && oldNewsletter.image) {
        try {
          fs.unlinkSync(path.join(__dirname, "..", oldNewsletter.image));
        } catch (err) {
          console.error("Error deleting old image:", err);
        }
      }
    }

    const updatedNewsletter = await NewsletterContent.findByIdAndUpdate(
      newsletterId,
      updateFields,
      { new: true }
    );

    if (!updatedNewsletter) {
      return res.status(404).json({ message: "Newsletter not found" });
    }

    res.status(200).json({
      message: "Newsletter updated successfully",
      newsletter: updatedNewsletter,
    });
  } catch (error) {
    console.error("Error updating newsletter:", error);
    res.status(500).json({
      message: "Error updating newsletter",
      error: error.message,
    });
  }
};

// Delete a newsletter
const deleteNewsletter = async (req, res) => {
  try {
    const newsletterId = req.params.id;

    const newsletter = await NewsletterContent.findById(newsletterId);

    if (!newsletter) {
      return res.status(404).json({ message: "Newsletter not found" });
    }

    // Delete associated image if it exists
    if (newsletter.image) {
      try {
        fs.unlinkSync(path.join(__dirname, "..", newsletter.image));
      } catch (err) {
        console.error("Error deleting image:", err);
      }
    }

    await NewsletterContent.findByIdAndDelete(newsletterId);

    res.status(200).json({ message: "Newsletter deleted successfully" });
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    res.status(500).json({
      message: "Error deleting newsletter",
      error: error.message,
    });
  }
};

// Send newsletter to selected subscribers
const sendNewsletter = async (req, res) => {
  try {
    const newsletterId = req.params.id;
    const { subscriberIds } = req.body; // Array of selected subscriber IDs

    // Validate input
    if (!subscriberIds || !Array.isArray(subscriberIds) || subscriberIds.length === 0) {
      return res.status(400).json({ message: "Please provide an array of subscriber IDs" });
    }

    // Find the newsletter by ID with full details
    const newsletter = await NewsletterContent.findById(newsletterId);

    if (!newsletter) {
      return res.status(404).json({ message: "Newsletter not found" });
    }

    if (newsletter.status === "draft") {
      return res
        .status(400)
        .json({ message: "Cannot send a draft newsletter" });
    }

    // Check if newsletter has image and make sure image path is valid
    if (newsletter.image) {
      // Log the image path for debugging
      console.log(`Newsletter image path: ${newsletter.image}`);

      // Ensure image path is properly formatted
      // If it doesn't include the uploads/images prefix and it's not a URL, we may need to modify it
      if (
        !newsletter.image.includes("uploads/images") &&
        !newsletter.image.startsWith("http://") &&
        !newsletter.image.startsWith("https://")
      ) {
        console.log(`Adding path prefix to image: ${newsletter.image}`);
        // Note: We don't modify the database record here, as our email service will handle the path correction
      }
    }

    // Get selected confirmed subscribers
    const subscribers = await Newsletter.find({ 
      _id: { $in: subscriberIds },
      isConfirmed: true 
    });

    if (subscribers.length === 0) {
      return res
        .status(400)
        .json({ message: "No selected confirmed subscribers found to send newsletter to" });
    }

    // Check if some subscribers were filtered out (not confirmed or not found)
    const filteredOutCount = subscriberIds.length - subscribers.length;
    if (filteredOutCount > 0) {
      console.warn(`${filteredOutCount} subscribers were filtered out because they are not confirmed or not found`);
    }

    // Log basic info before sending
    console.log(
      `Preparing to send newsletter "${newsletter.title}" to ${subscribers.length} selected confirmed subscribers (${filteredOutCount} subscribers filtered out)`
    );

    // Send emails to selected subscribers
    const sendResults = await batchSendNewsletter(subscribers, newsletter);

    // Update newsletter status
    newsletter.sentToSubscribers = true;
    newsletter.status = "published";
    newsletter.publishDate = new Date();
    newsletter.recipientCount = sendResults.sent;
    await newsletter.save();

    // Log success details
    console.log(
      `Newsletter ${newsletterId} sent successfully to ${sendResults.sent} selected subscribers`
    );
    if (sendResults.failed > 0) {
      console.warn(`Failed to send to ${sendResults.failed} subscribers`);
    }

    res.status(200).json({
      message: "Newsletter sent successfully to selected subscribers",
      results: {
        totalRequested: subscriberIds.length,
        filteredOut: filteredOutCount,
        total: sendResults.total,
        sent: sendResults.sent,
        failed: sendResults.failed,
        failedEmails:
          sendResults.errors.length > 0
            ? sendResults.errors.map((e) => e.email)
            : [],
      },
    });
  } catch (error) {
    console.error("Error sending newsletter:", error);
    res.status(500).json({
      message: "Error sending newsletter",
      error: error.message,
    });
  }
};

// Send newsletter to selected users with CV not null
const sendNewsletterToSelectedUsersWithCv = async (req, res) => {
  try {
    const newsletterId = req.params.id;
    const { userIds } = req.body; // Array of selected user IDs

    // Validate input
    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: "Please provide an array of user IDs" });
    }

    // Find the newsletter by ID with full details
    const newsletter = await NewsletterContent.findById(newsletterId);

    if (!newsletter) {
      return res.status(404).json({ message: "Newsletter not found" });
    }

    if (newsletter.status === "draft") {
      return res
        .status(400)
        .json({ message: "Cannot send a draft newsletter" });
    }

    // Check if newsletter has image and make sure image path is valid
    if (newsletter.image) {
      // Log the image path for debugging
      console.log(`Newsletter image path: ${newsletter.image}`);

      // Ensure image path is properly formatted
      if (
        !newsletter.image.includes("uploads/images") &&
        !newsletter.image.startsWith("http://") &&
        !newsletter.image.startsWith("https://")
      ) {
        console.log(`Adding path prefix to image: ${newsletter.image}`);
      }
    }

    // Get selected users with CV not null
    const users = await User.find({ 
      _id: { $in: userIds },
      cvFile: { $ne: null } 
    }).select('personalInfo.email personalInfo.firstName personalInfo.lastName');

    if (users.length === 0) {
      return res
        .status(400)
        .json({ message: "No selected users with CV found to send newsletter to" });
    }

    // Check if some users were filtered out (don't have CV)
    const filteredOutCount = userIds.length - users.length;
    if (filteredOutCount > 0) {
      console.warn(`${filteredOutCount} users were filtered out because they don't have CV`);
    }

    // Log basic info before sending
    console.log(
      `Preparing to send newsletter "${newsletter.title}" to ${users.length} selected users with CV (${filteredOutCount} users filtered out)`
    );

    // Send emails to selected users with CV
    const sendResults = await batchSendNewsletterToUsers(users, newsletter);

    // Log success details
    console.log(
      `Newsletter ${newsletterId} sent successfully to ${sendResults.sent} selected users with CV`
    );
    if (sendResults.failed > 0) {
      console.warn(`Failed to send to ${sendResults.failed} users`);
    }

    res.status(200).json({
      message: "Newsletter sent successfully to selected users with CV",
      results: {
        totalRequested: userIds.length,
        filteredOut: filteredOutCount,
        total: sendResults.total,
        sent: sendResults.sent,
        failed: sendResults.failed,
        failedEmails:
          sendResults.errors.length > 0
            ? sendResults.errors.map((e) => e.email)
            : [],
      },
    });
  } catch (error) {
    console.error("Error sending newsletter to selected users with CV:", error);
    res.status(500).json({
      message: "Error sending newsletter to selected users with CV",
      error: error.message,
    });
  }
};

const uploadNewsletterImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const filePath = req.file.path;
    const finalPath = "\\" + filePath;
    
    res.status(200).json({
      message: "Image uploaded successfully",
      filePath: finalPath,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      message: "Error uploading image",
      error: error.message,
    });
  }
};

// Update newsletter image
const updateNewsletterImage = async (req, res) => {
  try {
    const newsletterId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const newsletter = await NewsletterContent.findById(newsletterId);
    if (!newsletter) {
      return res.status(404).json({ message: "Newsletter not found" });
    }

    // Delete old image if exists
    if (newsletter.image) {
      removeExistingImage(newsletter.image);
    }

    // Update with new image
    const imagePath = req.file.path;
    newsletter.image = imagePath;
    await newsletter.save();

    res.status(200).json({
      message: "Newsletter image updated successfully",
      image: {
        path: imagePath,
        url: `${process.env.BASE_URL}/${imagePath}`,
        filename: req.file.filename,
      },
    });
  } catch (error) {
    console.error("Error updating newsletter image:", error);
    res.status(500).json({
      message: "Error updating newsletter image",
      error: error.message,
    });
  }
};

// Delete newsletter image
const deleteNewsletterImage = async (req, res) => {
  try {
    const newsletterId = req.params.id;

    const newsletter = await NewsletterContent.findById(newsletterId);
    if (!newsletter) {
      return res.status(404).json({ message: "Newsletter not found" });
    }

    if (!newsletter.image) {
      return res
        .status(400)
        .json({ message: "Newsletter does not have an image" });
    }

    // Delete image file
    removeExistingImage(newsletter.image);

    // Remove image reference from newsletter
    newsletter.image = null;
    await newsletter.save();

    res.status(200).json({ message: "Newsletter image deleted successfully" });
  } catch (error) {
    console.error("Error deleting newsletter image:", error);
    res.status(500).json({
      message: "Error deleting newsletter image",
      error: error.message,
    });
  }
};

// Get newsletter analytics
const getNewsletterAnalytics = async (req, res) => {
  try {
    const totalNewsletters = await NewsletterContent.countDocuments();
    const publishedNewsletters = await NewsletterContent.countDocuments({
      status: "published",
    });
    const draftNewsletters = await NewsletterContent.countDocuments({
      status: "draft",
    });
    const scheduledNewsletters = await NewsletterContent.countDocuments({
      status: "scheduled",
    });

    const totalSubscribers = await Newsletter.countDocuments();
    const confirmedSubscribers = await Newsletter.countDocuments({
      isConfirmed: true,
    });

    res.status(200).json({
      totalNewsletters,
      publishedNewsletters,
      draftNewsletters,
      scheduledNewsletters,
      totalSubscribers,
      confirmedSubscribers,
    });
  } catch (error) {
    console.error("Error fetching newsletter analytics:", error);
    res.status(500).json({
      message: "Error fetching newsletter analytics",
      error: error.message,
    });
  }
};

module.exports = {
  createNewsletter,
  getNewsletters,
  getNewsletterById,
  updateNewsletter,
  deleteNewsletter,
  sendNewsletter,
  getNewsletterAnalytics,
  uploadNewsletterImage,
  updateNewsletterImage,
  deleteNewsletterImage,
  sendNewsletterToSelectedUsersWithCv
};
