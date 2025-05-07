const express = require("express");
const routerNewsletter = express.Router();
const newsletterController = require("../controllers/NewsletterController");

routerNewsletter.post("/api/newsletter/subscribe", newsletterController.subscribe);
routerNewsletter.get("/api/newsletter/confirm", newsletterController.confirmSubscription);
routerNewsletter.post("/api/newsletter/unsubscribe", newsletterController.unsubscribe);

module.exports = routerNewsletter;