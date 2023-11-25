// ----------------- MODULES IMPORT -----------------
const mongoose = require("mongoose");

// ----------------- CREATING SCHEMA -----------------
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: Number,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  sapid: {
    type: Number,
    trim: true,
    required: true,
  },
  profilePic: {
    type: String,
    trim: true,
    required: false,
    default: "",
  },
  vehicles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicle",
    },
  ],
  parkingHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicleParkingHistory",
    },
  ],
  registeredOn: {
    type: Date,
    default: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    required: true,
  },
  updatedOn: {
    type: Date,
    default: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    required: false,
  },
});

// ----------------- CREATING MODEL -----------------
const userModel = mongoose.model("user", userSchema);

// ----------------- EXPORTING MODEL -----------------
module.exports = {
  USERMODEL: userModel,
};
