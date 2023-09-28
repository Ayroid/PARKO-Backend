// MODULES IMPORT
const mongoose = require("mongoose");

// CREATING SCHEMA
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otpValue: {
    type: Number,
    required: true,
  },
  issueTime: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  expiryTime: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 600000),
  },
});

// DEFINING INDEX FOR EXPIRY TIME
otpSchema.index({ expiryTime: 1 }, { expireAfterSeconds: 0 });

// CREATING MODEL
const otpModel = mongoose.model("otp", otpSchema);

// EXPORTING MODEL
module.exports = {
  OTPMODEL: otpModel,
};
