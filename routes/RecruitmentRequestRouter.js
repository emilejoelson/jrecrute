const express = require("express");
const routerRecruitmentRequest = express.Router();
const recruitmentRequestController = require("../controllers/RecruitmentRequestController");

routerRecruitmentRequest.get(
  "/api/getRecruitmentRequests",
  recruitmentRequestController.getRecruitmentRequests
);
routerRecruitmentRequest.post(
  "/api/addRecruitmentRequest",
  recruitmentRequestController.createRecruitmentRequest
);

module.exports = routerRecruitmentRequest;
