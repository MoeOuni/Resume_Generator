const jwt = require("jsonwebtoken");
const User = require("./../Models/UserModel");
const catchAsync = require("./../Utils/catchAsync");
const appError = require("./../Utils/appError");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    User: newUser,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Valid if Email and password are filled and not empty
  if (!email || !password) {
    return next(new appError("Please enter your email and password", 400));
  }
  // Searching in the database for the account with this data
  const user = await User.findOne({ email }).select("+password");

  // Verifying if data entered is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError("Email or password are not correct", 400));
  }

  // Generating the token and returning it
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
