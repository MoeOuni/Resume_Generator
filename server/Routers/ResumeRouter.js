const express = require("express");

const resumeController = require("./../Controllers/ResumeController");

const router = express.Router();

router.post("/set/:token", resumeController.setResume);
router.get("/get/:id", resumeController.getResume);
router.get("/get", resumeController.getAllResume);
router.patch("/update/:id", resumeController.updateResume);
router.delete("/delete/:id", resumeController.deleteResume);

module.exports = router;
