const Resume = require("./../models/ResumeModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("./../Utils/catchAsync");
const appError = require("./../Utils/appError");

// POST REQUEST
exports.setResume = catchAsync(async (req, res, next) => {
  let token = req.params.token;

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentOwner = decoded.id;

  req.body.CreatedBy = currentOwner;
  const newResume = await Resume.create(req.body);

  res.status(201).json({
    status: "success",
    newResume,
  });
});

// GET REQUEST
exports.getResume = catchAsync(async (req, res, next) => {
  // let token = req.params.id;

  // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // const currentOwner = decoded.id;

  const resume = await Resume.findOne({ _id: req.params.id });

  if (!resume) {
    return next(
      new appError("You didn't save any Resume Or you didn't create any", 500),
    );
  }

  res.status(200).json({
    status: "success",
    resume,
  });
});

// GET ALL REQUEST
exports.getAllResume = catchAsync(async (req, res, next) => {
  let token = req.body.token;
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentOwner = decoded.id;

  const resumes = await Resume.find({ CreatedBy: currentOwner });

  res.status(200).json({
    status: "success",
    resumes,
  });
});

// UPDATE/PATCH REQUEST
exports.updateResume = catchAsync(async (req, res, next) => {
  // let token = req.params.token;

  // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // const currentOwner = decoded.id;

  const resume = await Resume.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    status: "success",
    message: "Updated Successfuly",
  });
});

// DELETE REQUEST
exports.deleteResume = catchAsync(async (req, res, next) => {
  const ResumeToDelete = await Resume.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
  });
});
