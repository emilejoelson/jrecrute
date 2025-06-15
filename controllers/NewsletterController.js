const { Newsletter } = require("../models/NewsletterModel");
const crypto = require("crypto");
const sendConfirmationEmail = require("../utils/newsletterMailService");
require("dotenv").config();

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingSubscriber = await Newsletter.findOne({ email });

    if (existingSubscriber) {
      if (existingSubscriber.isConfirmed) {
        return res.status(400).json({ message: "Email already subscribed" });
      } else {
        const token = crypto.randomBytes(32).toString("hex");
        const expireTime = new Date();
        expireTime.setHours(expireTime.getHours() + 24); // Token expires in 24 hours

        existingSubscriber.confirmationToken = token;
        existingSubscriber.confirmationExpires = expireTime;
        await existingSubscriber.save();

        await sendConfirmationEmail(email, token);

        return res.status(200).json({
          message:
            "Confirmation email sent. Please check your inbox to complete subscription.",
        });
      }
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expireTime = new Date();
    expireTime.setHours(expireTime.getHours() + 24); // Token expires in 24 hours

    const newSubscriber = new Newsletter({
      email,
      confirmationToken: token,
      confirmationExpires: expireTime,
      isConfirmed: false,
    });

    await newSubscriber.save();
    await sendConfirmationEmail(email, token);

    res.status(201).json({
      message:
        "Confirmation email sent. Please check your inbox to complete subscription.",
    });
  } catch (error) {
    console.error("Error subscribing:", error);

    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already registered" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    res
      .status(500)
      .json({ message: "Error subscribing", error: error.message });
  }
};

const confirmSubscription = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Confirmation token is required" });
    }

    const subscriber = await Newsletter.findOne({
      confirmationToken: token,
      confirmationExpires: { $gt: new Date() },
    });

    if (!subscriber) {
      return res.status(400).json({
        message: "Invalid or expired confirmation token",
      });
    }

    subscriber.isConfirmed = true;
    subscriber.confirmationToken = undefined;
    subscriber.confirmationExpires = undefined;

    await subscriber.save();

    res.status(200).json({
      message: "Newsletter subscription confirmed successfully",
    });
  } catch (error) {
    console.error("Error confirming subscription:", error);
    res.status(500).json({
      message: "Error confirming subscription",
      error: error.message,
    });
  }
};

const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res
        .status(404)
        .json({ message: "Email not found in our subscribers list" });
    }

    await Newsletter.deleteOne({ email });

    res.status(200).json({ message: "Unsubscribed successfully" });
  } catch (error) {
    console.error("Error unsubscribing:", error);
    res
      .status(500)
      .json({ message: "Error unsubscribing", error: error.message });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find();
    res.status(200).json({ subscribers });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching subscribers",
      error: error.message,
    });
  }
};
module.exports = {
  subscribe,
  confirmSubscription,
  unsubscribe,
  getAllSubscribers,
};
