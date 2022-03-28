const express = require("express");

const authController = require("./../Controllers/AuthController");

const router = express.Router();

router.post("/auth/login", authController.login);
router.post("/auth/signup", authController.signUp);

module.exports = router;
