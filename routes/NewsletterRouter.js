const express = require("express");
const routerNewsletter = express.Router();
const newsletterController = require("../controllers/NewsletterController");
const { verifyToken, isAdmin } = require("../middlewares/AuthMiddleware");

routerNewsletter.post(
  "/api/newsletter/subscribe",
  newsletterController.subscribe
);
routerNewsletter.get(
  "/api/newsletter/confirm",
  newsletterController.confirmSubscription
);
routerNewsletter.post(
  "/api/newsletter/unsubscribe",
  newsletterController.unsubscribe
);
routerNewsletter.get(
  "/api/newsletter",
  newsletterController.getAllSubscribers
);
module.exports = routerNewsletter;
