const express = require("express");
const authController = require("../controllers/v1/auth.controller");

const router = express.Router();

router.get("/auth/google/url", authController.googleAuthUrl);
router.get("/auth/google", authController.googleAuth);
router.post("/auth/google/me", authController.googleUser);

module.exports = router;
