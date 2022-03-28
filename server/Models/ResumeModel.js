const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  CreatedBy: String,
  Header: {
    AboutMe: String,
    email: String,
    Phone: String,
    Image: String,
    Address: String,
    fullName: String,
  },
  Experiences: [
    {
      key: Number,
      NatureStage: String,
      Mission: String,
      Enterprise: String,
      BeginningDate: Date,
      EndingDate: Date,
    },
  ],
  Skills: [
    {
      key: Number,
      value: String,
    },
  ],
  Languages: [
    {
      key: Number,
      value: String,
      level: String,
    },
  ],
  Diplomas: [
    {
      key: Number,
      Titre: String,
      Date: String,
      Establishment: String,
      Mention: String,
    },
  ],
});

const Resume = mongoose.model("Resume", cvSchema);

module.exports = Resume;
