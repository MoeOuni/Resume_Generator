const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const resumeRouter = require("./Routers/ResumeRouter");
const userRouter = require("./Routers/UserRouter");

const app = express();

console.log("Session: " + process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// OPTIONAL
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/resume", resumeRouter);

module.exports = app;
