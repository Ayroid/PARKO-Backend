// MODULES IMPORT
const mongoose = require("mongoose");

// CREATING SCHEMA
const otpSchema = new mongoose.Schema({
  otpType: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  otpValue: {
    type: Number,
    required: true,
  },
  issueTime: {
    type: Date,
    required: true,
    default: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  },
  reRequestTime: {
    type: Date,
    required: true,
    default:
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) + 60000,
  },
  expiryTime: {
    type: Date,
    required: true,
    default:
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) + 300000,
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
