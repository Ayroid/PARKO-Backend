const mongoose = require("mongoose");

const issuesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  issueTitle: {
    type: String,
    required: true,
  },
  issueDescription: {
    type: String,
    required: true,
  },
  parkingNumber: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicle",
    required: true,
  },
  imgURL: {
    type: String,
    required: false,
  },
  issuedAgainst: {
    type: String,
    required: false,
  },
  issuedTime: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  resolvedTime: {
    type: Date,
    required: true,
    default: null,
  },
  issueStatus: {
    type: String,
    required: true,
    default: "OPEN",
  },
});

// ----------------- CREATING MODEL -----------------
const issuesModel = mongoose.model("issuesSchema", issuesSchema);

// ----------------- EXPORTING MODEL -----------------
module.exports = {
  ISSUESMODEL: issuesModel,
};
