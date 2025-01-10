const { RecruitmentRequest } = require("../models/RecruitmentRequestModel.js");
const sendEmailToAdmin = require("../utils/RecruitmentMailService.js");

const createRecruitmentRequest = async (req, res) => {
  try {
    const {
      companyName,
      contactEmail,
      phoneNumber,
      position,
      needsDescription,
      monthlyBudget,
      urgency,
    } = req.body;

    // Validate budget range
    if (monthlyBudget.min >= monthlyBudget.max) {
      return res.status(400).json({
        message: "The minimum budget must be less than the maximum budget",
      });
    }

    // Create new recruitment request
    const newRequest = new RecruitmentRequest({
      companyName,
      contactEmail,
      phoneNumber,
      position,
      needsDescription,
      monthlyBudget,
      urgency,
    });

    await newRequest.save();

    // Send email notification
    await sendEmailToAdmin(newRequest);

    res.status(201).json({
      message: "Demande de recrutement créée avec succès",
      requestId: newRequest._id,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la demande:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Erreur de validation",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }
    res.status(500).json({
      message: "Erreur lors de la création de la demande",
      error: error.message,
    });
  }
};

const getRecruitmentRequests = async (req, res) => {
  try {
    const requests = await RecruitmentRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Erreur lors de la récupération des demandes:", error);
    res.status(500).json({
      message: "Erreur lors de la récupération des demandes",
      error: error.message,
    });
  }
};

module.exports = {
  createRecruitmentRequest,
  getRecruitmentRequests,
};
